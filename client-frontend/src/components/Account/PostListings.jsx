import React, { useState, useEffect } from 'react';
import { Stack, Card, CardContent, Typography } from '@mui/material';

function PostsListing() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts when the component mounts
    fetch('http://localhost:8080/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div style={{ padding: '41px' }}>
      <Stack spacing={2} sx={{ width: 1000,}}>
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h2">{post.title}</Typography>
              <Typography variant="body1">{post.content}</Typography>
              <br/>
              <img style ={{width:'100%'}}src="images/finance.jpg" alt="" />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}

export default PostsListing;
