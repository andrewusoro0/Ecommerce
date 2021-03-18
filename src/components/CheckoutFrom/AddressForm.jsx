 import React, {useState, useEffect} from 'react';
 import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
 import { useForm, FormProvider } from 'react-hook-form';

 import FromInput from './CustomTextField';
 import { commerce } from '../../lib/commerce';
 
 const AddressForm = ({checkoutToken}) => {
     const [shippingCountries, setShippingCountries] = useState([])
     const [shippingCountry, setShippingCountry] = useState('')
     const [shippingSubdivisions, setShippingSubdivisions] = useState([])
     const [shippingSubdivision, setShippingSubdivision] = useState('')
     const [shippingOptions, setShippingOptions] = useState([])
     const [shippingOption, setShippingOption] = useState('')
     const methods =useForm();

     const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
     const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id:code, label:name}))
     const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))


     const fetchShippingCountries = async (checkoutTokenId) =>{
          const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)

          setShippingCountries(countries)
          setShippingCountry(Object.keys(countries)[0])
     }


     const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
      };

      const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region});
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
      };

     useEffect(() =>{
          fetchShippingCountries(checkoutToken.id)
     },[])

     useEffect(() =>{
      if(shippingCountry)  fetchSubdivisions(shippingCountry)
     },[shippingCountry])

     useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, setShippingCountry, shippingSubdivision)
     },[shippingSubdivision])

     return (
         <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
            <form onSubmit = ''>
                <Grid container spacing={3}>
                    <FromInput name='frist name' label='Frist name' />
                    <FromInput name='last name' label='Last name' />
                    <FromInput name='email' label='Email' />
                    <FromInput name='address1' label='Address' />
                    <FromInput name='city' label='City' />
                    <FromInput name='zip' label='ZIP / Postal Code' />
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                    {countries.map((country)=>(
                         <MenuItem key={country.id} value={country.id}>
                              {country.label}
                         </MenuItem>

                    ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivision</InputLabel>
                    <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                    {subdivisions.map((subdivision)=>(
                         <MenuItem key={subdivision.id} value={subdivision.id}>
                              {subdivision.label}
                         </MenuItem>

                    ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                    {options.map((option)=>(
                         <MenuItem key={option.id} value={option.id}>
                              {option.label}
                         </MenuItem>

                    ))}  
                    </Select>
                </Grid>
                </Grid>
            </form>
            </FormProvider>
         </>
     )
 }
 
 export default AddressForm;
 