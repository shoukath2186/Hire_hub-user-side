// import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Welcome to HireHub
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Your go-to platform for job opportunities and career growth.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" sx={{ mr: 2 }}>
          Find Jobs
        </Button>
       
      </Box>

      <Box sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Explore Job Listings
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Browse through various job listings and find your dream job.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Post a Job
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Let potential candidates find your job openings by posting a job.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Sign Up for Updates
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Stay updated with the latest job opportunities and career advice.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
