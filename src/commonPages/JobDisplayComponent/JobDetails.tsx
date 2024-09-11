import { useLocation, useNavigate } from 'react-router-dom';
import { Job } from '../../datatypes.ts/IJob';
import { useEffect, useState } from 'react';
import {
  Avatar, Box, Card, CardContent, Chip, Divider, Grid, Typography,
  Container, Paper, List, ListItem, ListItemIcon, ListItemText, Button,
  ThemeProvider, createTheme,
} from '@mui/material';
import {
  AttachMoney, LocationOn, School, Work, Business,
  CalendarToday, PhoneAndroid, Category, Description
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AuthState } from '../../datatypes.ts/IUserData';

import ConfirmModal from './ConformModal/conformmodat';
import { axiosInstance } from '../Modal/APIforaxios';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const theme = createTheme({
  palette: {
    primary: { main: '#2196f3', light: '#bbdefb', dark: '#1976d2', },
    background: { default: '#e3f2fd', },
  },
});

function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const jobDetails = location.state?.jobDetails as Job | undefined;
  const [job] = useState<Job | null>(jobDetails ?? null);
  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [applied, setApplied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    if (!jobDetails) {
      navigate('/job');
    }
    console.log(1010,jobDetails);
    
    axiosInstance.get(`/job/checkApplicationExists?Id=${job?._id}`).then((res) => {

      setApplied(true)
      console.log(12321,res.data);
      
    }).catch((err)=>{
      console.log(9999,err.data);
      
      console.log(err.message);
    })

  }, [jobDetails, navigate,isModalOpen]);

  if (!job) return null;
  
  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ConfirmModal open={isModalOpen}
        onClose={handleCloseModal}
        jobTitle={job.title}
        EmplyerId={job.employerDetails._id}
        jobId={job._id}
      />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'white' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#E0E0E0' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={job.employerDetails.profilePicture}
                      alt={job.name}
                      sx={{ width: 150, height: 150, mb: 2, border: '4px solid white' }}
                    />
                    <Typography variant="h5" component="div" gutterBottom align="center" color="primary.dark">
                      {job.name}
                    </Typography>
                    <Divider sx={{ width: '100%', my: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemIcon><Business color="primary" /></ListItemIcon>
                        <ListItemText primary="Company" secondary={job.name} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><LocationOn color="primary" /></ListItemIcon>
                        <ListItemText primary="Location" secondary={job.location} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><PhoneAndroid color="primary" /></ListItemIcon>
                        <ListItemText primary="Contact" secondary={job.contact} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CalendarToday color="primary" /></ListItemIcon>
                        <ListItemText
                          primary="Posted on"
                          secondary={new Date(job.createdAt).toLocaleDateString()}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom color="primary.dark">
                  {job.title}
                </Typography>
                {applied ? (
                  <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
                  <Chip
                    icon={<DoneAllIcon sx={{ color: 'blue' }} />}
                    label="Applied"
                    sx={{
                      '& .MuiChip-icon': {
                        color: 'blue',
                      },color:'blue'
                    }}
                  />
                </Box>
                ) : null}
                <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
                  <Chip icon={<Work />} label={job.job_type} color="primary" />
                  <Chip icon={<AttachMoney />} label={`₹ ${job.salary}`} sx={{ bgcolor: '#4caf50', color: 'white' }} />
                  <Chip icon={<School />} label={job.education} sx={{ bgcolor: '#9c27b0', color: 'white' }} />
                  <Chip icon={<Category />} label={job.category} variant="outlined" color="primary" />
                </Box>


                <Typography variant="h6" gutterBottom color="primary.dark">Skills Required</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                  {job.skill.map((skill, index) => (
                    <Chip key={index} label={skill} variant="outlined" color="primary" />
                  ))}
                </Box>

                <Typography variant="h6" gutterBottom color="primary.dark">Job Description</Typography>
                <Typography variant="body1" paragraph>
                  {job.description}
                </Typography>

                <Typography variant="h6" gutterBottom color="primary.dark">Responsibilities</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Description color="primary" /></ListItemIcon>
                    <ListItemText primary="Develop and maintain software applications" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Description color="primary" /></ListItemIcon>
                    <ListItemText primary="Collaborate with cross-functional teams" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Description color="primary" /></ListItemIcon>
                    <ListItemText primary="Participate in code reviews and implement best practices" />
                  </ListItem>
                </List>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                  <Typography variant="body2" color="text.secondary">
                    Total Applications: {job.applications.length}
                  </Typography>

                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    onClick={() => navigate('/job')}
                    startIcon={<Work />}
                    sx={{ '&:hover': { bgcolor: 'success.dark' } }}
                  >
                    Find Job
                  </Button>
                  {userInfo.user_role != 'employer' && !applied ? (<Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Work />}
                    onClick={handleApplyClick}
                    sx={{ '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    Apply Now
                  </Button>) : (<></>)}

                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default JobDetails;