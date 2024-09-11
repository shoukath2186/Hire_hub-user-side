import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { User } from "../../datatypes.ts/IChatType";
import { Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const UserProfileViewModal = ({ Chater }: { Chater: User | undefined }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={handleOpen}>
        Profile
      </li>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="user-profile-modal-title"
        aria-describedby="user-profile-modal-description"
      >
         <Box
      sx={{
        ...style,
        width: 400,
        padding: '24px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #ece9e6 0%, #ffffff 100%)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
      }}
    >
      <Typography
        id="user-profile-modal-title"
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 'bold',
          fontSize: '24px',
          textAlign: 'center',
          color: '#333',
          mb: 4,
        }}
      >
        User Profile
      </Typography>
      {Chater ? (
        <Box id="user-profile-modal-description">
          {Chater.profilePicture && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <img
                  src={Chater.profilePicture === 'hello'
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
                    : Chater.profilePicture || '/api/placeholder/64/64'}

                  alt={Chater.user_name || 'Profile'}
                  className="w-32 h-32 object-cover rounded-full"
                />
              {/* <img
                src={Chater.profilePicture}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
                style={{
                  border: '4px solid #eee',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              /> */}
            </Box>
          )}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '16px', color: '#555' }}>
              <strong>Email:</strong> {Chater.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '16px', color: '#555' }}>
              <strong>Username:</strong> {Chater.user_name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '16px', color: '#555' }}>
              <strong>Role:</strong> {Chater.user_role}
            </Typography>
            {/* <Typography variant="body1" sx={{ mb: 2, fontSize: '16px', color: '#555' }}>
              <strong>ID:</strong> {Chater._id}
            </Typography> */}
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
          No user data available
        </Typography>
      )}
    </Box>
      </Modal>
    </div>
  );
}

export default UserProfileViewModal;