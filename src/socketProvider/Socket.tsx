

import {createContext,useContext,useState,ReactNode, useEffect} from 'react'
import { useChatState } from '../chatHandle/ChatContextApi/ContextApi'
import { Notification } from '../datatypes.ts/IChatType'
import { axiosInstance } from '../commonPages/Modal/APIforaxios'
import io,{Socket} from 'socket.io-client';
import { AuthState } from '../datatypes.ts/IUserData';
import { useSelector } from 'react-redux';

interface CallingType{
  signal:any,
  chatId:string,
  from:string,
  user:string,
  userId:string
}

interface SockerProvider{ 
    socketConnected:boolean,
    checkNotif:boolean,
    setCheckNotif:(checkNotif:boolean)=>void,
    setSocketConnected:(socket:boolean)=>void
    socket:Socket;
    calling:CallingType|null,
    setCalling:(calling:CallingType|null)=>void
    
}

const SocketContext=createContext<undefined|SockerProvider>(undefined);

interface SocketProviderProps{
    children: ReactNode;
}


const ENDPOINT = 'http://localhost:3000';

let socket: Socket; 

const SocketProvider:React.FC<SocketProviderProps>=({children})=>{

    const [socketConnected, setSocketConnected] = useState<boolean>(false);

    const [checkNotif,setCheckNotif]=useState<boolean>(false)

    const { userInfo } = useSelector((state: AuthState | any) => state.auth);

    const {notification,setNotification,selectChat}=useChatState();

    const [calling,setCalling]=useState<CallingType|null>(null);

    useEffect(()=>{
      if(userInfo){
        socket=io(ENDPOINT);
        socket.emit('setup',userInfo);
        socket.on('connected', () => { setSocketConnected(true)});
        
      }
    },[userInfo])

    useEffect(()=>{
      if(socketConnected){
        socket.on('video-call-signal', async (data:CallingType) => {
           setCalling(data);
        })
      }
      socket.on('call-ended', ()=>{
        setCalling(null)
      });
      return ()=>{
        socket.off('video-call-signal');
      }
    })

  useEffect(()=>{
    const messageListener=(newMessageReceived:Notification)=>{
     
        if(!selectChat||selectChat._id!==newMessageReceived.chat._id){
              if(!notification.some(n=>n._id===newMessageReceived._id)){
                setNotification([newMessageReceived, ...notification]);
              }
        }
       
    }
    socket.on('message receved',messageListener);
    return (()=>{
      socket.off('message receved',messageListener)
    })

  }, [notification, selectChat, setNotification])

  const takeNotification = async () => {
    try {
      const { data } = await axiosInstance.get('/chat/userNotifications');
      
      setNotification(
        data.map((value: any) => {
          const { _id, sender, content, chat, contentType, createdAt,updatedAt } = value.messageId;
          return { _id, sender, content, chat, contentType, createdAt,updatedAt,notificationId:value._id };
        })
      );
      
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};
 
useEffect(()=>{takeNotification(); },[checkNotif]);

  return (
    <SocketContext.Provider value={{socketConnected, setSocketConnected,socket,checkNotif,setCheckNotif,calling,setCalling}}>
        {children}
    </SocketContext.Provider>
  )
}

export const SockerContext=():SockerProvider=>{

    const context= useContext(SocketContext)
    if (context === undefined) {
        throw new Error('SocketContext must be used within a socketProvider');
      }
      
      return context;
}

export default SocketProvider