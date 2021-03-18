import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FromInput = ({name,label }) => {
    const {control} = useFormContext( )
    return (
        <Grid item xs={12} sm={6}>
            <Controller as={TextField} control={control} fullWidth name={name} label={label} required/>
        </Grid>
    )
}

export default FromInput;
