const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const colors = require('colors');
const crypto = require('crypto');
const MyInfoConnector = require('myinfo-connector-v4-nodejs');
const fs = require('fs');
const config = require('./config/config.js');

const app = express();
const port = 3001;
const connector = new MyInfoConnector(config.MYINFO_CONNECTOR_CONFIG);

var sessionIdCache = {};

app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/getEnv', function (req, res) {
  try {
    if (
      config.APP_CONFIG.DEMO_APP_CLIENT_ID == undefined ||
      config.APP_CONFIG.DEMO_APP_CLIENT_ID == null
    ) {
      res.status(500).send({ error: 'Missing Client ID' });
    } else {
      res.status(200).send({
        clientId: config.APP_CONFIG.DEMO_APP_CLIENT_ID,
        redirectUrl: config.APP_CONFIG.DEMO_APP_CALLBACK_URL,
        scope: config.APP_CONFIG.DEMO_APP_SCOPES,
        purpose_id: config.APP_CONFIG.DEMO_APP_PURPOSE_ID,
        authApiUrl: config.APP_CONFIG.MYINFO_API_AUTHORIZE,
        subentity: config.APP_CONFIG.DEMO_APP_SUBENTITY_ID,
      });
    }
  } catch (error) {
    console.log('Error'.red, error);
    res.status(500).send({ error: error });
  }
});

app.get('/callback', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(path.join(dirname, filename), 'utf8', function (err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

app.post('/getPersonData', async function (req, res, next) {
  try {
    var authCode = req.body.authCode;
    var codeVerifier = sessionIdCache[req.cookies.sid];
    console.log('Calling MyInfo NodeJs Library...'.green);

    let privateSigningKey = fs.readFileSync(
      config.APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_SIGNING_KEY,
      'utf8'
    );

    let privateEncryptionKeys = [];
    readFiles(
      config.APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_ENCRYPTION_KEYS,
      (filename, content) => {
        privateEncryptionKeys.push(content);
      },
      (err) => {
        throw err;
      }
    );

    let personData = await connector.getMyInfoPersonData(
      authCode,
      codeVerifier,
      privateSigningKey,
      privateEncryptionKeys
    );

    console.log('--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:'.green);
    console.log(JSON.stringify(personData));
    res.status(200).send(personData);
  } catch (error) {
    console.log('---MyInfo NodeJs Library Error---'.red);
    console.log(error);
    res.status(500).send({ error: error });
  }
});

app.post('/generateCodeChallenge', async function (req, res, next) {
  try {
    let pkceCodePair = connector.generatePKCECodePair();
    let sessionId = crypto.randomBytes(16).toString('hex');
    sessionIdCache[sessionId] = pkceCodePair.codeVerifier;

    res.cookie('sid', sessionId);
    res.status(200).send(pkceCodePair.codeChallenge);
  } catch (error) {
    console.log('Error'.red, error);
    res.status(500).send({ error: error });
  }
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

app.listen(port, () =>
  console.log(`Demo App Client listening on port ${port}!`)
);
