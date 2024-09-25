import { useState, useRef, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import { AiFillAudio, AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BsFillStopFill, BsMicFill } from "react-icons/bs";
import { axiosInstance } from '../../commonPages/Modal/APIforaxios';
import { useChatState } from '../ChatContextApi/ContextApi'
import { MessageType } from '../../datatypes.ts/IChatType';
import { toast } from 'react-toastify'
import { Socket } from 'socket.io-client';
import { AxiosError } from 'axios';


interface MessageInputProps {
  setMessage: (message: MessageType[]) => void;
  message: MessageType[];
  socket: Socket
  NewMessage: boolean
  setNewMessage: (NewMessage: boolean) => void
}


const AudioRecordModal: React.FC<MessageInputProps> = ({ setMessage, message, socket, NewMessage, setNewMessage }) => {
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => setOpen(true);

  const handleClose = async () => {
    setOpen(false);
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
    }
    setIsRecording(false);
    setAudioURL(null);
    setAudioFile(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      recorderRef.current = new MediaRecorder(stream);

      recorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      recorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const newAudioFile = new File([audioBlob], "recorded_audio.wav", { type: 'audio/wav' });
        setAudioFile(newAudioFile);
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        audioChunksRef.current = [];
      };

      recorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing audio devices", error);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioURL]);

  const { selectChat } = useChatState()
  const sendAudio = async () => {
    if (!audioFile) {
      console.error("No audio file to send.");
      return;
    }
    setLoading(true);

    try {
      handleClose();
      const { data } = await axiosInstance.post('/chat/saveFile', { file: audioFile, chatId: selectChat?._id }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setAudioFile(null)
      setNewMessage(!NewMessage)
      setMessage([...message, data])
      socket.emit("new message", data);
      setLoading(false);
      toast.success('Audio uploaded successfully.');

    } catch (error) {
      setAudioFile(null)

      if (error instanceof AxiosError) {
        if (error.response) {
            toast.error(error.response.data || 'An error occurred.');
        } else {
           
          toast.error('Failed to send the audio. Please try again later.')
        }
    }
    
     

    }
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <AiFillAudio size={24} />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="audio-modal-title"
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h2 id="audio-modal-title" className="text-2xl font-bold mb-4 text-center">Record Audio</h2>
          <div className="flex justify-center space-x-4 mb-6">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <BsMicFill className="mr-2" /> Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <BsFillStopFill className="mr-2" /> Stop Recording
              </button>
            )}
          </div>

          {audioURL && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Recorded Audio:</h3>
              <audio ref={audioRef} src={audioURL} className="display" />
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={togglePlayPause}
                  className="text-4xl text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </button>
              </div>
              <div className="flex justify-end">

                {isRecording ? (<></>) : (
                  <button
                    className={`p-2 px-4 rounded-xl mx-3 bg-red-300`}
                    onClick={handleClose}

                  >
                    Cancel
                  </button>
                )}


                <button
                  className={`p-2 px-4 rounded-xl ${loading ? 'bg-gray-300' : 'bg-blue-200'}`}
                  onClick={sendAudio}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
export default AudioRecordModal