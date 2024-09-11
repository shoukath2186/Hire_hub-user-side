import * as React from 'react';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaPaperclip, FaFileImage, FaFileVideo } from "react-icons/fa6";
import { styled } from '@mui/material/styles';
import { axiosInstance } from '../../commonPages/Modal/APIforaxios';
import { useChatState } from '../ChatContextApi/ContextApi';
import {toast} from 'react-toastify'

const StyledModal = styled(Modal)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    outline: 'none',
}));

const FileInput = styled('input')({
    display: 'none',
});

const FileInputLabel = styled('label')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.grey[200],
    },
}));

const PreviewContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
}));

import { MessageType } from '../../datatypes.ts/IChatType';
import { Socket } from 'socket.io-client';

interface MessageInputProps {
  setMessage: (message: MessageType[]) => void;
  message: MessageType[];
  socket:Socket
}

const FileTakeModel: React.FC<MessageInputProps> = ({ setMessage, message,socket }) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setPreview(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(selectedFile);
            } else if (selectedFile.type.startsWith('video/')) {
                const videoUrl = URL.createObjectURL(selectedFile);
                setPreview(videoUrl);
            }
        }
    };
    const {selectChat}=useChatState()
     const handleSubmit =async () => {
        if (file) {
            setLoading(true)
            handleClose();
            try {
                const {data}=await axiosInstance.post('/chat/saveFile',{file:file,chatId:selectChat?._id},{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }});

                    setMessage([...message, data]);
                    socket.emit("new message", data);
                    socket.emit('join chat', selectChat?._id);
                    
                   setLoading(false)
                   toast.success('File uploaded successfully.');
                  
                
            } catch (error) {
                console.log(error);
                toast.error('Failed to send the file. Please try again later.')
                setLoading(false)
                
            }

        }
        handleClose();
    };

    return (
        <div>
            <FaPaperclip size={20} onClick={handleOpen} style={{ cursor: 'pointer' }} />
            <StyledModal
                open={open}
                onClose={handleClose}
                aria-labelledby="file-upload-modal-title"
                aria-describedby="file-upload-modal-description"
            >
                <ModalContent>
                    <Typography id="file-upload-modal-title" variant="h6" component="h2" gutterBottom>
                        Upload Image or Video
                    </Typography>
                    <Typography id="file-upload-modal-description" sx={{ mb: 2 }}>
                        Please select an image or video file to upload.
                    </Typography>
                   {loading?(<></>):(
                     <FileInput
                     id="file-input"
                     type="file"
                     accept="image/*, video/*"
                     onChange={handleFileChange}
                 />
                   )}
                    
                    <FileInputLabel htmlFor="file-input">
                        {file ? (
                            file.type.startsWith('image/') ? <FaFileImage size={24} /> : <FaFileVideo size={24} />
                        ) : (
                            <FaPaperclip size={24} />
                        )}
                        <Typography sx={{ ml: 1 }}>
                            {file ? file.name : 'Choose a file'}
                        </Typography>
                    </FileInputLabel>

                    {preview && (
                        <PreviewContainer>
                            {file?.type.startsWith('image/') ? (
                                <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={preview}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    controls
                                />
                            )}
                        </PreviewContainer>
                    )}

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                        {file?(
                             <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
                             {loading ? 'Loading...' : 'Upload'}
                         </Button>
                        ):(<></>)}
                       
                    </Box>
                </ModalContent>
            </StyledModal>
        </div>
    );
}

export default FileTakeModel;