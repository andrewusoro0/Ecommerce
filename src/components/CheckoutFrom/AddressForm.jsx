 import React, {useState} from 'react';
 import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
 import { useForm, FormProvider } from 'react-hook-form';

 import FromInput from './CustomTextField';
 import { commerce } from '../../lib/commerce';
 
 const AddressForm = () => {
     const [shippingCountries, setShippingCountries] = useState([])
     const [shippingCountry, setShippingCountry] = useState('')
     const [shippingSubivisions, setShippingSubdivisions] = useState([])
     const [shippingSubivision, setShippingSubdivision] = useState('')
     const [shippingOptions, setShippingOptions] = useState([])
     const [shippingOption, setShippingOption] = useState('')

     const fetchShippingCountries = async (checkoutTokenId) =>{
          const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)

          setShippingCountries(countries)
     }

     const methods =useForm()
     return (
         <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
            <form onSubmit = ''>
                <Grid container spacing={3}>
                    <FromInput required name='frist name' label='Frist name' />
                    <FromInput required name='last name' label='Last name' />
                    <FromInput required name='email' label='Email' />
                    <FromInput required name='address1' label='Address' />
                    <FromInput required name='city' label='City' />
                    <FromInput required name='zip' label='ZIP / Postal Code' />
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={} fullWidth onChange={}>
                         <MenuItem key={} value={}>
                               Select me
                         </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select value={} fullWidth onChange={}>
                         <MenuItem key={} value={}>
                               Select me
                         </MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={} fullWidth onChange={}>
                         <MenuItem key={} value={}>
                               Select me
                         </MenuItem>
                    </Select>
                </Grid>
                </Grid>
            </form>
            </FormProvider>
         </>
     )
 }
 
 export default AddressForm;
 