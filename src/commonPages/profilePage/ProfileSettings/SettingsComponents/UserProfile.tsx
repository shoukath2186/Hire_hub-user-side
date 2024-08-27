import  { useState, useRef, useCallback } from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { UserDataUpdate } from "../../../../datatypes.ts/IUpdateForm";

interface UserProps {
    setUser: React.Dispatch<React.SetStateAction<UserDataUpdate>>;
}

const UserProfile: React.FC<UserProps> = ({ setUser }) => {
    const [src, setSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                setSrc(reader.result as string);
                setModalOpen(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                1,
                width,
                height
            ),
            width,
            height
        );
        setCrop(crop);
        setImage(e.currentTarget);
    };

    const getCroppedImg = useCallback((image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        if (ctx) {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }
    
        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    resolve(blob);
                },
                'image/png',
                1
            );
        });
    }, []);

    const handleConfirm = useCallback(async () => {
        if (imgRef.current && completedCrop) {
            try {
                const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
                const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
                
                setCroppedImageUrl(croppedImageUrl);
                
                const file = new File([croppedImageBlob], 'cropped_profile_picture.png', { type: 'image/png' });
                setUser(prev => ({ ...prev, profilePicture: file }));
                setModalOpen(false);
            } catch (error) {
                console.error('Error cropping image:', error);
            }
        }
    }, [completedCrop, getCroppedImg, setUser]);

    const handleCancel = () => {
        setSrc(null);
        setModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
            <input
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
                Select Profile Image
            </Button>
           
            <Modal open={modalOpen} onClose={handleCancel}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2">
                        Crop Your Image
                    </Typography>
                    {src && (
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={1}
                        >
                            <img 
                                ref={imgRef}
                                src={src} 
                                onLoad={onImageLoad} 
                                alt="Crop me" 
                                style={{ maxWidth: '100%' }}
                            />
                        </ReactCrop>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleCancel} variant="outlined">Cancel</Button>
                        <Button onClick={handleConfirm} variant="contained">Confirm</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserProfile;