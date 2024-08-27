
import { Modal, Box, Typography, IconButton, Button, Grid, Chip,  Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import { UserProfile } from '../../../datatypes.ts/IJobProfile';

interface UserProfileModalProps {
    userProfile: UserProfile | null;
    isModalOpen: boolean;
    closeModal: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ userProfile, isModalOpen, closeModal }) => {
    if (!userProfile) return null;

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="user-profile-modal-title"
            aria-describedby="user-profile-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 800,
                    maxHeight: '90vh',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                    overflowY: 'auto',
                    backgroundColor: '#f0faff',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography id="user-profile-modal-title" variant="h4" component="h2" sx={{ color: '#007bff' }}>
                        User Profile
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{ color: '#007bff' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>Bio</Typography>
                        <Typography variant="body1" sx={{ color: '#333' }}>{userProfile.bio}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#007bff' }} />
                            <Typography variant="body1" sx={{ color: '#333' }}>{userProfile.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LanguageIcon sx={{ mr: 1, color: '#007bff' }} />
                            <Link href={userProfile.website} target="_blank" rel="noopener noreferrer" sx={{ color: '#007bff' }}>
                                {userProfile.website}
                            </Link>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>Social Links</Typography>
                        {Object.entries(userProfile.socialLinks).filter(([platform]) => platform !== '_id').map(([platform, link]) => (
                            
                            <Link key={platform} href={link} target="_blank" rel="noopener noreferrer" display="block" sx={{ color: '#007bff', mb: 1 }}>
                                {platform}
                            </Link>
                        ))}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>Skills</Typography>
                        <Box>
                            {userProfile.skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>
                            <WorkIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#007bff' }} />
                            Experience
                        </Typography>
                        {userProfile.experience.map((exp, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ color: '#333' }}>{exp.role} at {exp.company}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {exp.duration}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#555' }}>{exp.description}</Typography>
                            </Box>
                        ))}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>
                            <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#007bff' }} />
                            Education
                        </Typography>
                        {userProfile.education.map((edu, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ color: '#333' }}>{edu.degree}</Typography>
                                <Typography variant="body2" sx={{ color: '#555' }}>{edu.institution}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {edu.year}
                                </Typography>
                            </Box>
                        ))}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>
                            <SportsEsportsIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#007bff' }} />
                            Hobbies
                        </Typography>
                        <Box>
                            {userProfile.hobbies.map((hobby, index) => (
                                <Chip
                                    key={index}
                                    label={hobby}
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                    color="secondary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#007bff' }}>Resume</Typography>
                        <Button variant="contained" color="primary" component="a" href={userProfile.resume as string} target="_blank" download>
                            Download Resume
                        </Button>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={closeModal}
                        sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>

    );
};

export default UserProfileModal;