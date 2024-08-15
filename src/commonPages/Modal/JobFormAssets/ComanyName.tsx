

import { Grid, TextField } from '@mui/material'
// import React from 'react'

const ComanyName: React.FC<{
    companyName: string;
    setCompanyName: (value: string) => void;
    error: string;
  }> = ({ companyName, setCompanyName, error })=> {

    const handilChinges=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCompanyName(e.target.value)
    }

    return (
        <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
            <TextField
                fullWidth
                id='company name'
                name='company name'
                label='Company Name'
                autoFocus
                value={companyName}
                onChange={ handilChinges}
                error={!!error}
                helperText={error}
            />
        </Grid>
    )
}

export default ComanyName