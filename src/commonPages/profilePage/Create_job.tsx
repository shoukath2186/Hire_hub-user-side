import  { useState } from 'react';
import Button from '@mui/material/Button';
import AddJobModal from '../Modal/AddJobModal';

const ParentComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" type='button'
       color="primary" onClick={handleClickOpen}>
        Create New Job
      </Button>
      <AddJobModal open={open} onClose={handleClose} />
    </>
  );
};

export default ParentComponent;
