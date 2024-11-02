import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Microinsurance Shopping
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ProductList onAddToCart={handleAddToCart} />
        </Grid>
        <Grid item xs={4}>
          <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
