
import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

function Cart({ cart, onRemoveFromCart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <Typography variant="h5">Cart</Typography>
      <List>
        {cart.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
            <Button onClick={() => onRemoveFromCart(index)}>Remove</Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${totalPrice}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.Telegram.WebApp.sendData(`Checkout: ${totalPrice}`)}
      >
        Checkout
      </Button>
    </div>
  );
}

export default Cart;
