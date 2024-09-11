
import { useEffect, useRef, useState } from "react"
import MessageInput from "./MessageInput"
import { useChatState } from "../ChatContextApi/ContextApi";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import CircularProgress from '@mui/material/CircularProgress';
import { MessageType } from "../../datatypes.ts/IChatType";
import { useSelector } from "react-redux";
import { AuthState } from "../../datatypes.ts/IUserData";
import MessageAlination from "../Config/MessageAlienation";
import io,{Socket} from 'socket.io-client';
const ENDPOINT = 'http://localhost:3000';

let socket: Socket; 
let selectChatCompare: any; 


function DisplayMessage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageType[]>([]);

    const [socketConnected, setSocketConnected] = useState<boolean>(false);

    const { userInfo } = useSelector((state: AuthState | any) => state.auth);

    const { selectChat,notification,setNotificationHandil,setIsTyping } = useChatState();

    const scrollRef = useRef<HTMLDivElement | null>(null);

     

   
    
    useEffect(()=>{
        socket=io(ENDPOINT);
        socket.emit('setup',userInfo);
        socket.on('connected', () => {
        setSocketConnected(true)});
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop typing', () => setIsTyping(false));
      },[])

     
      

     
    

    const takeUserMessage = async () => {
        try {
            const { data } = await axiosInstance.get(`/chat/message/${selectChat?._id}`);

            //  socket.emit("new message", data);

             socket.emit('join chat', selectChat?._id);

            setMessage(data)
            setLoading(false)

        } catch (error) {
            setLoading(false)

            console.log(error);

        }
    }



    useEffect(() => {
        setLoading(true)

        takeUserMessage()
        selectChatCompare=selectChat;

    }, [selectChat])


    


    useEffect(()=>{
        socket.on('message receved',(newMessageReceived)=>{
           
          if(!selectChatCompare||selectChatCompare._id!==newMessageReceived.chat._id){
            if(!notification.includes(newMessageReceived)){

              setNotificationHandil([newMessageReceived, ...notification]);
             
 
             }
          }else{
            setMessage([...message,newMessageReceived])
           
            
          }
        })
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
      }, [message]);

    return (
        <div className=" h-full w-full flex flex-col justify-between">
            {loading ? (<>
                <div className=" h-full flex items-center justify-center border-l-2 border-r-2 border-gray-300"
                >
                    <CircularProgress
                        sx={{
                            color: 'black', width: 100, height: 100, '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            },
                        }}
                    />
                </div>
            </>) : (
                <>
                    <div className="bg-[#ffffff] h-full overflow-auto  border-l-2 border-r-2 border-gray-300"
                    ref={scrollRef}>
                        {message.length > 0 ?
                            message.map((msg,i)=>(
                                <MessageAlination
                                    key={msg._id}
                                    message={msg}
                                    nextMessage={message[i+1]?message[i+1]:undefined}
                                    prevMessage={message[i-1]?message[i-1]:undefined}
                                    isOwnMessage={msg.sender._id === userInfo._id}
                                />
                            ))
                            : (<>
                                <div className="h-full w-full flex items-center justify-center">
                                    <h1>No Chat History.</h1>
                                </div>
                            </>)}
                    </div>
                </>
            )}
            <div>
                <MessageInput setMessage={setMessage} message={message} socket={socket} socketConnected={socketConnected}/>
            </div>
        </div>
    )
    
}


export default DisplayMessage