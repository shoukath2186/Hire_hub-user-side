import { Grid, TextField } from '@mui/material'


// import React from 'react'

const Contact: React.FC<{
    contact: string;
    setContact: (value: string) => void;
    error: string;
  }> = ({ contact, setContact, error })=> {
    return (
        <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
            <TextField
                fullWidth
                id='contact'
                name='contact'
                label='Contact Number'
                autoFocus
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                error={!!error}
                helperText={error}
            />
        </Grid>
    )
}

export default Contact