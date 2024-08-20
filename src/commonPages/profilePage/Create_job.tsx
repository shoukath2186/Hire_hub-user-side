import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddJobModal from '../Modal/AddJobModal';
import { axiosInstance } from '../Modal/APIforaxios';
import { Job } from '../../datatypes.ts/IJob';
import JobDisplay from '../ProfileComponents/JobDisplay';




const ParentComponent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [allJob, setAllJob] = useState<Job[] | any>([])

  useEffect(() => {
    axiosInstance.get('/job/getjobs')
      .then((res) => {

        setAllJob(res.data);
        console.log(res.data);

      }).catch((error) => {
        console.log(error);

      })
  }, [open])

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

      <div>
        <div className='full '>
          <div className=' '>

            {allJob? (
              <JobDisplay allJob={allJob} setAllJob={setAllJob}/>
            ) : (
              <p>No jobs available.</p>
            )}





          </div>

        </div>
      </div>

    </>
  );
};

export default ParentComponent;
