import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AuthState } from "../datatypes.ts/IUserData";
import { SockerContext } from "../socketProvider/Socket";
import { Chat } from "../datatypes.ts/IChatType";
import { MessageHedderLogic } from "../chatHandle/Config/ChatListLogic";
import VideoCallButtons from "./VideoElement/VideoCallButtons";

const iceServers = {
    iceServers: [{ urls: 'stun:stun.1.google.com:19302' }]
};

const VideoCallHandling: React.FC = () => {
    const [fullScreen, setFullScreen] = useState<boolean>(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [callEnded, setCallEnded] = useState<boolean>(false);
    
    
    const userVideo = useRef<HTMLVideoElement | null>(null);
    const partnerVideo = useRef<HTMLVideoElement | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const chatData = location.state as Chat;
    const [searchParams] = useSearchParams();

    const { userInfo } = useSelector((state: { auth: AuthState }) => state.auth);
    const { socketConnected, socket } = SockerContext();

    const stopMediaStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (userVideo.current) {
            userVideo.current.srcObject = null;
        }
    };

    const takeUserData = () => {
        if (chatData && userInfo) {
            return MessageHedderLogic(chatData, userInfo._id);
        }
        return null;
    };

    const setupMediaStream = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (userVideo.current) {
                userVideo.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing media devices:", err);
            toast.error("Unable to access camera or microphone");
        }
    };

    useEffect(() => {
        if (!chatData) navigate('/chat');

        if (socketConnected && socket) {
            socket.on('rejected-call-receiver', () => {
                toast.info('The call was ended by the recipient.');
                stopMediaStream();
                navigate('/chat');
            });

            socket.on('accept-call-recever', handleCallAccepted);
            socket.on('call-ended', handleCallEnded);
            socket.on('incoming-signal', handleIncomingSignal);
            socket.on('ice-candidate', handleIceCandidate);
        }

        return () => {
            if (socket) {
                socket.off('incoming-signal');
                socket.off('rejected-call-receiver');
                socket.off('accept-call-receiver');
                socket.off('call-ended');
                socket.off('ice-candidate');
            }
        };
    }, [chatData, socketConnected, socket, navigate]);

    useEffect(() => {


        createCall();
        setupMediaStream();
        return () => {
            stopMediaStream();  
            if (peerConnectionRef.current) { 
                peerConnectionRef.current.close();
            }
        };

    }, []);

    const handleIncomingSignal = async (data: any) => {

        console.log("Received incoming signal", data);

        const peerConnection = setupPeerConnection();
        try {
            if(peerConnection.signalingState=='have-remote-offer'||peerConnection.signalingState=='have-local-pranswer'){
                console.log("Setting remote description",peerConnection.signalingState);
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                socket.emit('returning-signal', {
                    signal: answer,
                    to: takeUserData()?.users[0]._id
                });
            }else{
                console.log("Cannot set remote description in stable state.");
                
            }
             
        } catch (err) {
            console.error("Error handling incoming signal:", err);
            toast.error("Failed to establish connection");
        }
    };

    const handleIceCandidate = (data: any) => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
                .catch(err => console.error("Error adding ICE candidate:", err));
        }
    };

    const createCall = async () => {

        const receiver = searchParams.get('creater');
        const isReceiverTrue = receiver === 'true';
        
        if (isReceiverTrue){

            const peerConnection = setupPeerConnection();
            try {

                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);

                socket.emit('video-call', {
                    signal: offer,
                    chatId: takeUserData()?._id,
                    to: takeUserData()?.users[0]._id,
                    user: userInfo?.user_name,
                    userId: userInfo?._id
                });
            } catch (err) {
                console.error("Error creating call:", err);
                toast.error("Failed to initiate call");
            }
        }
    };

    const setupPeerConnection = () => {
        const peerConnection = new RTCPeerConnection(iceServers);
        peerConnectionRef.current = peerConnection;

        if (stream) {
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        }

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', {
                    candidate: event.candidate,
                    to: takeUserData()?.users[0]._id
                });
            }
        };

        peerConnection.ontrack = (event) => {
            console.log('Received remote track', event.streams[0]);

            if (partnerVideo.current) {
                partnerVideo.current.srcObject = event.streams[0];
            }
        };

        return peerConnection; 
    };

    const handleCallAccepted = async (data: any) => {

        setCallAccepted(true);

         

        const peerConnection = setupPeerConnection();

        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.signal));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('returning-signal', {
                signal: answer,
                to: takeUserData()?.users[0]._id
            });
            console.log("Call accepted and answer sent back to the caller.");
        } catch (error) {
            console.error("Error during call acceptance:", error);
            toast.error("Failed to establish connection");
        }
    };

    const handleCallEnded = () => {
        stopMediaStream();
        setCallEnded(true);
        navigate('/chat');
    };

    const Buttons: React.FC = () => (
        <VideoCallButtons
            stream={stream}
            chatData={chatData}
            setCallEnded={setCallEnded}
            stopMediaStream={stopMediaStream}
            peerConnectionRef={peerConnectionRef}
            fullScreen={fullScreen} 
            setFullScreen={setFullScreen}
           
        />
    );

    return (
        <div className="bg-white w-full min-h-[91vh] flex items-center justify-center absolute">
            <div className="h-[84vh] w-[95%] flex-row relative">
                {!fullScreen ? (
                    <div className="h-full bg-white">
                        <div className="md:flex w-full">
                            <div className="bg-gray-600 w-full mt-2 md:mt-0 h-[250px] md:h-[470px] rounded-xl mr-2">
                                {callAccepted && !callEnded && (
                                    <video playsInline ref={partnerVideo} autoPlay className="w-full h-full object-cover rounded-xl" />
                                )}
                            </div>
                            <div className="bg-gray-600 w-full h-[250px] md:h-[470px] rounded-xl ml-2">
                                <video playsInline muted ref={userVideo} autoPlay className="w-full h-full object-cover rounded-xl" />
                            </div>
                        </div>
                        <Buttons />
                    </div>
                ) : (
                    <div className="bg-gray-600 h-[84vh] w-full flex-row rounded-xl relative">
                        {callAccepted && !callEnded && (
                            <video playsInline ref={partnerVideo} autoPlay className="w-full h-full object-cover rounded-xl" />
                        )}
                        <div className="absolute w-[300px] h-[30%] bg-gray-700 rounded-xl right-9 bottom-6">
                            <video playsInline muted ref={userVideo} autoPlay className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <Buttons />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCallHandling;