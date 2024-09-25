import { useState } from "react"
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai"
import { FiCamera, FiCameraOff } from "react-icons/fi"
import { MdCallEnd } from "react-icons/md"
import { RiSplitCellsHorizontal } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { SockerContext } from "../../socketProvider/Socket"
import { MessageHedderLogic } from "../../chatHandle/Config/ChatListLogic"
import { useSelector } from "react-redux"
import { AuthState } from "../../datatypes.ts/IUserData"
import { Chat } from "../../datatypes.ts/IChatType"

interface VideoCallButtorType {
    stream: MediaStream | null,
    chatData: Chat,
    setCallEnded: (chatEnded: boolean) => void,
    stopMediaStream: () => void,
    peerConnectionRef: React.RefObject<RTCPeerConnection | null>
    fullScreen : boolean,
    setFullScreen : (fullScreen:boolean)=>void
   
}


const VideoCallButtons: React.FC<VideoCallButtorType> = ({ stream, chatData, setCallEnded, stopMediaStream, peerConnectionRef,setFullScreen ,fullScreen }) => {

    const [mute, setMute] = useState<boolean>(false);
    const [onCamera, setOnCamera] = useState<boolean>(true);

    const navigate = useNavigate();

    const { userInfo } = useSelector((state: { auth: AuthState }) => state.auth);
    const {  socket } = SockerContext();

    const takeUserData = () => {
        if (chatData && userInfo) {
            return MessageHedderLogic(chatData, userInfo._id);
        }
    };

    const muteHandling = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setMute(!audioTrack.enabled);
        }
    };

    const cameraHandling = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setOnCamera(videoTrack.enabled);
        }
    };

    const handleScreen = () => {

        setFullScreen(!fullScreen); 
       
    };

    const endCall = async () =>{

        setCallEnded(true);

        stopMediaStream()

        const currentPeerConnection = peerConnectionRef.current;
        if (currentPeerConnection) {
            currentPeerConnection.close();
        }



        socket?.emit('end-call', { to: takeUserData()?.users[0]._id });


        navigate('/chat');

    };

    return (
        <div className={`w-full ${fullScreen ? 'absolute bottom-0 left-0' : ''} h-[150px] z-10 flex items-center justify-center space-x-6`}>
            <button className="w-[60px] h-[50px] bg-red-500 rounded-full flex items-center justify-center hover:cursor-pointer" onClick={endCall}>
                <MdCallEnd className="inline-block align-middle" size={30} />
            </button>
            <button className={`w-[50px] h-[50px] rounded-full flex items-center justify-center hover:cursor-pointer ${mute ? 'bg-gray-400' : 'bg-gray-300'}`} onClick={muteHandling}>
                {mute ? (
                    <AiOutlineAudioMuted className="inline-block align-middle" size={30} />
                ) : (
                    <AiOutlineAudio className="inline-block align-middle" size={30} />
                )}
            </button>
            <button className={`w-[50px] h-[50px] rounded-full flex items-center justify-center hover:cursor-pointer ${!onCamera ? 'bg-gray-400' : 'bg-gray-300'}`} onClick={cameraHandling}>
                {!onCamera ? (
                    <FiCameraOff className="inline-block align-middle" size={30} />
                ) : (
                    <FiCamera className="inline-block align-middle" size={30} />
                )}
            </button>
            <button className={`w-[50px] h-[50px] rounded-full flex items-center justify-center hover:cursor-pointer ${fullScreen ? 'bg-gray-300' : 'bg-gray-400'}`} onClick={handleScreen}>
                <RiSplitCellsHorizontal className="inline-block align-middle" size={30} />
            </button>
        </div>
    )
}

export default VideoCallButtons