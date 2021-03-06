import React from 'react';
import { Container, Typography, Button, Grid, CssBaseline } from "@material-ui/core";
import {Link} from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles'

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {

    const classes = useStyles();

    const EmptyCart =() => (
        <Typography variant="subtile1">You have no items in your Shopping cart
            <Link to="/" className={classes.link}> Please add an item  to cart</Link>!
        </Typography>
    );
    
    const FilledCart =() =>(
        <>
        <CssBaseline />
           <Grid container spacing={3}>
           {cart.line_items.map((item) =>(
               <Grid item xs={12} sm={4} key={item.id}>
                   <CartItem item={item}
                       onUpdateCartQty={ handleUpdateCartQty}
                       onRemoveFromCart={handleRemoveFromCart}
                   />
               </Grid>
           ))}
           </Grid>
           <div className={classes.cardDetails}>
              <Typography variant="h5"> Subtotal:{cart.subtotal.formatted_with_symbol} </Typography>
              <div>
                  <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                  <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Chectout</Button>
              </div>  
           </div>
           <br/>
       </> 
    );

    if(!cart.line_items) return "loading...." ;

    return (
        <Container>
            <div  className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
        </Container>
    )
}

export default Cart;
