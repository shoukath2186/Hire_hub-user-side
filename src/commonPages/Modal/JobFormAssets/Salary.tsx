// import React from 'react'
import { Grid, TextField } from '@mui/material'

const Salary : React.FC<{
    salary: string;
    setSalary: (value: string) => void;
    error: string;
  }> = ({ salary, setSalary, error })=> {
  return (
    <Grid item xs={12} sm={6}>
    <TextField
        fullWidth
        id='salary'
        name='salary'
        label='Salary'
        autoFocus
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        error={!!error}
        helperText={error}
    />
</Grid>
  )
}

export default Salary