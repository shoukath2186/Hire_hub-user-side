// import React from 'react'
import { Grid, TextField } from '@mui/material'

const Location: React.FC<{
    location: string;
    setLocation: (value: string) => void;
    error: string;
  }> = ({ location, setLocation, error })=> {
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                id='location'
                name='location'
                label='Location'
                autoFocus
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ mb: 2 }}
            />
        </Grid>
    )
}

export default Location