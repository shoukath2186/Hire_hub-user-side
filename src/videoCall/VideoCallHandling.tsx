import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Chat } from '../datatypes.ts/IChatType';
import { AuthState } from '../datatypes.ts/IUserData';
import { SockerContext } from '../socketProvider/Socket';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { MessageHedderLogic } from '../chatHandle/Config/ChatListLogic';
import { toast } from 'react-toastify';

           
function randomID(len: number = 5): string {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}


export function getUrlParams(url: string = window.location.href): URLSearchParams {
    const urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function App() {
    const [calling, setCalling] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [showEndCallButton, setShowEndCallButton] = useState<boolean>(true);
    const zpInstanceRef = useRef<any>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const chatData = location.state as Chat;
    const [searchParams] = useSearchParams();

    const { userInfo } = useSelector((state: { auth: AuthState }) => state.auth);
    const { socket } = SockerContext();

    const takeUserData = () => {
        if (chatData && userInfo) {
            return MessageHedderLogic(chatData, userInfo._id);
        }
        return null;
    };


    const createCall = async () => {
        const receiver = searchParams.get('creater');
        const isReceiverTrue = receiver === 'true';
        if (isReceiverTrue && !calling && url) {
            try {
                socket?.emit('video-call', {
                    signal: url,
                    chatId: takeUserData()?._id,
                    to: takeUserData()?.users[0]._id,
                    user: userInfo?.user_name,
                    userId: userInfo?._id,
                });
                setCalling(true);
            } catch (error) {
                console.error("Error creating call:", error);
                toast.error("Failed to initiate call");
            }
        }
    };

    useEffect(() => {
        createCall();
    }, [url, calling]);

    useEffect(() => {
        const roomID = getUrlParams().get('roomID') || randomID(5);
        setUrl(roomID);
       
    }, [])


    const myMeeting = async (element: HTMLDivElement | null) => {
        if (!element || !url) return;

        const appID = 582949777;
        const serverSecret = "1aa18559d26fc055baa3a43509e36d46";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, url, randomID(5), randomID(5));

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpInstanceRef.current = zp;

        const videoCallUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${url}`;



        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy link',
                    url: videoCallUrl,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },



            onJoinRoom: () => {
                setShowEndCallButton(false);
                setCalling(true);
            },
            onLeaveRoom: () => {
                setShowEndCallButton(true);
            }
        });
    };



    const handleEndCall = () => {
        if (zpInstanceRef.current) {
            zpInstanceRef.current.destroy();
        }
        socket?.emit('end-call', { to: takeUserData()?.users[0]._id });
        navigate('/chat');

    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '900px' }}>
            <div
                className="myCallContainer "
                ref={myMeeting}
                style={{ width: '100%', height: '100%' }}
            ></div>

            {showEndCallButton && (
                <div className="file flex items-center justify-start " style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={handleEndCall}
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            padding: '12px 24px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF1A1A')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                    >
                        Go To Chat
                    </button>
                </div>
            )}

        </div>
    );
}
