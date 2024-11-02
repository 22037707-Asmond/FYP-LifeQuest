import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

function ProductCard({ product, onAddToCart }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
