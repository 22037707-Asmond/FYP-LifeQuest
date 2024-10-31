require("dotenv").config();

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto"); // For generating code challenge
const session = require("express-session");
const pool = require("./db");
const nodemailer = require("nodemailer");
const sendEmail = require("./sendEmail");

const app = express();
const port = process.env.PORT || 5002;

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Set to true if using HTTPS
  })
);

// Base64 URL encode utility function
const base64url = (source) => {
  // Encode in classical base64
  let encodedSource = Buffer.from(source).toString("base64");

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  return encodedSource;
};

// Endpoint to get environment variables
app.get("/getEnv", (req, res) => {
  const envData = {
    clientId: process.env.CLIENT_ID,
    authApiUrl: process.env.AUTH_API_URL,
    scope: process.env.SCOPE,
    purpose_id: process.env.PURPOSE_ID,
    method: process.env.METHOD,
    redirectUrl: process.env.REDIRECT_URL,
  };
  res.json(envData);
});

// Endpoint to generate code challenge
app.post("/generateCodeChallenge", (req, res) => {
  const codeVerifier = base64url(crypto.randomBytes(32)); // Generate a random code verifier
  const hash = base64url(
    crypto.createHash("sha256").update(codeVerifier).digest("base64")
  );
  req.session.codeVerifier = codeVerifier; // Store the code verifier in the session or any storage
  res.json(hash);
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password, first_name } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO account (first_name, email, password) VALUES (?, ?, ?)",
      [first_name, email, password]
    );
    const [rows] = await pool.query(
      "SELECT * FROM account WHERE first_name = ? AND email = ? AND password = ?",
      [first_name, email, password]
    );

    // Send a welcome email
    await sendEmail(email, "Welcome!", "Thank you for signing up!");

    res
      .status(200)
      .send({ message: "User created successfully", user: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error creating user", details: error });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM account WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length > 0) {
      res.status(200).send({ message: "Login successful", user: rows[0] });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

//get all articles
app.get("/api/article", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM articles");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//delete an article
app.delete("/api/article/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send("Record deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update an article
app.put("/api/article/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE articles SET title = ?, content = ? WHERE id = ?",
      [title, content, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Record not found");
    }

    // Fetch the updated article details
    const [updatedRows] = await pool.query(
      "SELECT * FROM articles WHERE id = ?",
      [id]
    );
    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//add new article
app.post("/api/article/add", async (req, res) => {
  const { email, title, content } = req.body;

  console.log(email, title, content);

  // Validate input data
  if (!email || !title || !content) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Default accountid value
    const media = null; // Replace with the desired default value
    const image = 0; // Replace with the desired default value
    const video = 0; // Replace with the desired default value

    // Insert new article into the database
    const [result] = await pool.query(
      "INSERT INTO articles (content, media, title, image, video) VALUES (?, ?, ?, ?, ?)",
      [content, media, title, image, video]
    );

    // Fetch the newly added article
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [
      result.insertId,
    ]);

    // Respond with the newly added article's data
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//get all agents
app.get("/api/v1/agents", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM agent");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add a new agent
app.post("/api/v1/agents", async (req, res) => {
  const { name, salary, email, telephone } = req.body;

  // Validate input data
  if (!name || !salary || !email || !telephone) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Insert new agent into the database
    const [result] = await pool.query(
      "INSERT INTO agent (mr_ms, salary, email, telephone) VALUES (?, ?, ?, ?)",
      [name, salary, email, telephone]
    );

    // Fetch the newly added agent
    const [rows] = await pool.query("SELECT * FROM agent WHERE id = ?", [
      result.insertId,
    ]);

    // Respond with the newly added agent's data
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//delete an agent
app.delete("/api/v1/agents/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM agent WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send("Record deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//update an agent
app.put("/api/v1/agents/:id", async (req, res) => {
  const { id } = req.params;
  const { name, salary, email, telephone } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE agent SET mr_ms = ?, salary = ?, email = ?, telephone = ? WHERE id = ?",
      [name, salary, email, telephone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Record not found");
    }

    // Fetch the updated agent details
    const [updatedRows] = await pool.query("SELECT * FROM agent WHERE id = ?", [
      id,
    ]);
    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//get all accounts/admins
app.get("/api/v1/admins", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM account");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//delete an admin
app.delete("/api/v1/admins/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM account WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send("Record deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//update an admin
app.put("/api/v1/admins/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, email, password } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE account SET first_name = ?, email = ?, password = ? WHERE id = ?",
      [first_name, email, password, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Record not found");
    }

    // Fetch the updated agent details
    const [updatedRows] = await pool.query(
      "SELECT * FROM account WHERE id = ?",
      [id]
    );
    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint to get person data using auth code and code verifier
app.post("/getPersonData", async (req, res) => {
  const { authCode } = req.body;
  const codeVerifier = req.session.codeVerifier; // Retrieve the code verifier from the session or any storage

  try {
    // Exchange auth code for access token
    const tokenResponse = await axios.post(
      "config.APP_CONFIG.MYINFO_API_TOKEN",
      {
        code: authCode,
        code_verifier: codeVerifier,
        redirect_uri: process.env.REDIRECT_URL,
        client_id: process.env.CLIENT_ID,
        grant_type: "authorization_code",
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch person data using access token
    const personDataResponse = await axios.get(
      "https://api.example.com/person",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(personDataResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
