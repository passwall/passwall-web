import React from 'react';

function Paddle() {
    const Paddle = window.Paddle;
    const email = document.getElementById('email').value;
    const openCheckout  = () => { 
        Paddle.Checkout.open({ 
            product: 630862,
            email: email
        });
    }
    return (
        <button onClick={openCheckout}>Subscribe Now!</button>
    );
  }
  export default Paddle;

  