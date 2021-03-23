import React, {useState, useEffect} from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link } from "react-router-dom";
import { commerce } from '../../../lib/commerce';   
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import useStyles from './styles'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    debugger
    const [activeStep, setActiveStep] = useState(2);
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles();

    
    const next = (data) => {
        
        setShippingData(data)
        nextStep()
    }
    const timeout=() => {
        setTimeout(() =>{
            setIsFinished(true)
        },3000)
    }
    
    const nextStep = () => setActiveStep((perActiveStep) => perActiveStep + 1 );
    const backStep = () => setActiveStep((perActiveStep) => perActiveStep - 1 );
    
    useEffect(() =>{
        const generateToken =async() => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: "cart"})
                
                setCheckoutToken(token)
                
            } catch (error){
                console.log(error)
            }
        }
        generateToken()
        
    },[cart])

    let Confirmation = () => (order.customer ? (
        <>
         <div>
            <Typography variant='h5'> Thank you for your purchase, {order.customer.fristname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divder}/>
            <Typography variant="subtitle2"> Order ref: {order.customer_reference}</Typography>
         </div>
        <br/>
         <Button component={Link} to='/' variant='outlined' type='button' >Back to Home</Button>

        </>
    ) : isFinished ? (
        <>
        <div>
           <Typography variant='h5'> Thank you for your purchas!</Typography>
           <Divider className={classes.divder}/>
        </div>
       <br/>
        <Button component={Link} to='/' variant='outlined' type='button' >Back to Home</Button>

       </>
    ): (
        <div className={classes.spinner}>
           <CircularProgress/>
        </div>
    ))
    if(error){
        Confirmation = () => (
       <>
       <Typography variant='h5'> Error: { error}</Typography>
       <br/>
       <Button component={Link} to='/' variant='outlined' type='button' >Back to Home</Button>
       </>
        )
    }

    const Form = () => activeStep === 0
     ? <AddressForm checkoutToken={checkoutToken} next={next}/>
     : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout}/>

    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                 {steps.map((step) =>(
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                 ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
            </main>
        </>
    )
}

export default Checkout;
