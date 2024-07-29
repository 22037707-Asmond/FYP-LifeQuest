import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../Components/PageFragment/Header";
import { delPost, getAllPosts, updatePost } from "./PostingAPI"; // Ensure this path is correct

function PostsListing() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllPosts()
      .then((response) => {
        if (Array.isArray(response)) {
          setArticles(response); // Set the articles state with the fetched data
        } else {
          setError("Invalid response from server");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Failed to fetch posts");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    delPost(id)
      .then(() => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
        navigate('/article');
      })
      .catch((error) => {
        setError(error.message || "Failed to delete post");
      });
  };

  const handleUpdateClick = (article) => {
    setSelectedArticle(article);
    setFormData({ title: article.title, content: article.content });
    setOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    updatePost(selectedArticle.id, formData.title, formData.content)
      .then((updatedArticle) => {
        setArticles((prevArticles) =>
          prevArticles.map((article) => (article.id === selectedArticle.id ? updatedArticle : article))
        );
        setOpen(false);
        navigate('/article');
      })
      .catch((error) => {
        setError(error.message || "Failed to update post");
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box m="20px">
      <Header title="Articles" subtitle="Manage Articles Posted" />
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
                  <IconButton onClick={() => handleUpdateClick(article)}>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Article</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={formData.content}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PostsListing;
