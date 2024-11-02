import React from 'react';
import { Grid2 } from '@mui/material';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Basic Health Plan', price: 10, description: 'Covers basic health expenses' },
  { id: 2, name: 'Accident Coverage', price: 15, description: 'Coverage for accidents' },
  { id: 3, name: 'Life Insurance', price: 20, description: 'Affordable life insurance' },
  // Add more products as needed
];

function ProductList({ onAddToCart }) {
  return (
    <Grid2 container spacing={2}>
      {products.map((product) => (
        <Grid2 item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ProductList;
