


// import React from 'react';

interface NewJobFormProps {
  open: () => void;
  close: () => void;
}

const NewJobForm: React.FC<NewJobFormProps> = ({ open, close }) => {

    open()

  return (
    <>
    <div>New Job Form</div>
     <button onClick={()=>close()}>close</button>
    </>
    
  );
};

export default NewJobForm;