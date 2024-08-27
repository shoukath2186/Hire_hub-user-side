import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Paper, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { axiosInstance } from '../../Modal/APIforaxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  EmplyerId: string;
  jobId: any;
}

function ConfirmModal({ open, onClose, jobTitle, EmplyerId, jobId }: ConfirmModalProps) {


  const [coverLetter, setCoverLetter] = useState('');
  const [loading, isLoading] = useState<boolean>(false);
  const navigate=useNavigate()

  const handleConfirm = () => {

    isLoading(true)
    const data = {
      cover: coverLetter,
      EmplyerId,
      jobId
    }
    console.log(data);


    axiosInstance.post('/job/newApplication', data).then((res) => {
       console.log(res.data);
      toast.success(res.data);
      onClose()
      isLoading(false)
      setCoverLetter('');

    }).catch((error) => {

      toast.error('Create Job Profile');
      onClose()
      isLoading(false)
      setCoverLetter('');
      navigate('/profile')
      console.log(error);

    })

  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: '',
          color: '',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Confirm Application
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'blue' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Job: {jobTitle}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to apply for this position?
          </Typography>
        </Paper>
        <Box my={2}>
          <Typography variant="h6" gutterBottom color="primary">
            Cover Letter (Optional)
          </Typography>
          <TextField
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            placeholder="Add your cover letter here..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: 'italic' }}
          >
            Tip: A well-written cover letter can significantly improve your
            chances of getting the job.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'space-between',
          px: 3,
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        {!loading ? (
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
          // disabled={coverLetter.trim().length === 0}
          >
            Confirm Application
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
          >
            Loading...
          </Button>)}

      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
