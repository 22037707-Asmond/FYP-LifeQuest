import React, { useState, useEffect } from 'react';
import { Stack, Card, CardContent, Typography } from '@mui/material';

function PostsListing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts when the component mounts
    fetch('http://localhost:8080/api/article')
      .then(response => response.json())
      .then(data => {
        // Convert media bytes to Blob URLs
        const postsWithUrls = data.map(post => ({
          ...post,
          mediaUrl: URL.createObjectURL(new Blob([new Uint8Array(post.media)])) // Convert bytes to Blob
        }));
        setPosts(postsWithUrls);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Clean up the URLs when the component unmounts
  useEffect(() => {
    return () => {
      posts.forEach(post => {
        if (post.mediaUrl) {
          URL.revokeObjectURL(post.mediaUrl);
        }
      });
    };
  }, [posts]);

  return (
    <div style={{ padding: '41px' }}>
      <Stack spacing={2} sx={{ width: 1000 }}>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h2">{post.title}</Typography>
              <Typography variant="body1">{post.content}</Typography>
              <img style={{ width: '100%' }} src={post.mediaUrl} alt={post.title} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}

export default PostsListing;
