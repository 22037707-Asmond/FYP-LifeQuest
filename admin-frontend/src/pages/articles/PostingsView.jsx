import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { delPost, getAllPosts, updatePost } from "./PostingAPI"; // Ensure this path is correct

function PostsListing() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log("Fetching posts..."); // Log before fetching posts

    getAllPosts()
      .then((response) => {
        console.log("API Response:", response); // Log the API response
        if (Array.isArray(response)) {
          setArticles(response); // Set the articles state with the fetched data
        } else {
          console.error("Invalid API response structure:", response);
          setError("Invalid response from server");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error.message || "Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Current articles state:", articles); // Log articles whenever it changes
  }, [articles]);

  const handleDelete = (id) => {
    delPost(id)
      .then(() => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        setError(error.message || "Failed to delete post");
      });
  };

  const handleUpdate = (id) => {
    // Implement the update logic here
    updatePost(id)
      .then((updatedArticle) => {
        setArticles((prevArticles) =>
          prevArticles.map((article) => (article.id === id ? updatedArticle : article))
        );
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        setError(error.message || "Failed to update post");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box m="20px">
      <Header title="Articles" subtitle="Manage Articles Posted"/>
      <Box height="65vh" overflow="auto" p="20px">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Box key={article.id} mb="20px" p="15px" border="1px solid #ddd" borderRadius="8px">
              <h2>{article.title}</h2>
              {article.media && (
                <Box mb="10px">
                  {article.media.startsWith("data:image") ? (
                    <img src={article.media} alt={article.title} style={{ maxWidth: "100%" }} />
                  ) : (
                    <video controls style={{ maxWidth: "100%" }}>
                      <source src={article.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Box>
              )}
              <p style={{ padding: "5px 5px 5px 5px" }}>
                {article.content}
              </p>
              <Box display="flex" justifyContent="space-between" p={2}>
                <Box display="flex" ml="auto">
                  <IconButton onClick={() => handleDelete(article.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleUpdate(article.id)}>
                    <UpdateIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <div>No articles available</div>
        )}
      </Box>
    </Box>
  );
}

export default PostsListing;
