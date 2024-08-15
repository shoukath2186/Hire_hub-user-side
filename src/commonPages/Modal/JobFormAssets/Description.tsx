
import { Grid, TextField } from '@mui/material'
// impo/rt React from 'react'

const Description : React.FC<{
    description: string;
    setDescription: (value: string) => void;
    error: string;
  }> = ({ description, setDescription, error })=> {
  return (
    <Grid item xs={12} sm={12}>
    <TextField
        fullWidth
        id='description'
        name='description'
        label='Job description'
        autoFocus
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        error={!!error}
        helperText={error}
    />
</Grid>
  )
}

export default Description