import { Grid, TextField } from '@mui/material'

// import React from 'react'

const Title : React.FC<{
    title: string;
    setTitle: (value: string) => void;
    error: string;
  }> = ({ title, setTitle, error })=> {
    return(
    <Grid item xs={12} sm={6}>
    <TextField
        fullWidth
        id='titel'
        name='titel'
        label='Job Titel'
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={!!error}
        helperText={error}
    />
    </Grid>
    )
}

export default Title