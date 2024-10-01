
import { useEffect, useRef, useState } from "react"
import MessageInput from "./MessageInput"
import { useChatState } from "../ChatContextApi/ContextApi";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import CircularProgress from '@mui/material/CircularProgress';
import { MessageType } from "../../datatypes.ts/IChatType";
import { useSelector } from "react-redux";
import { AuthState } from "../../datatypes.ts/IUserData";
import MessageAlination from "../Config/MessageAlienation"; 
import { SockerContext } from "../../socketProvider/Socket";
import { toast } from "react-toastify";


function DisplayMessage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageType[]>([]);
    const [isdelete,setIsdelete] = useState<boolean>(false);
    const [NewMessage,setNewMessage]=useState<boolean>(false)

    
    const {socketConnected,socket,checkNotif,setCheckNotif}=SockerContext();

    const { userInfo } = useSelector((state: AuthState | any) => state.auth);

    const { selectChat,setIsTyping,resetUser,setResetUser } = useChatState();

    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        socket?.on('typing', () => setIsTyping(true));
        socket?.on('stop typing', () => setIsTyping(false));
      },[])

     
    const takeUserMessage = async () => {
        try {
            const { data } = await axiosInstance.get(`/chat/message/${selectChat?._id}`);
             socket?.emit('join chat', selectChat?._id);
            setNewMessage(!NewMessage)
            setMessage(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
   useEffect(()=>{ setLoading(true)},[selectChat])

    useEffect(() => {
       
        takeUserMessage()
    }, [selectChat,isdelete])



    const removeUserData=()=>{
        axiosInstance.delete(`/chat/removeNotification?chatId=${selectChat?._id}`).then(({data})=>{
            setCheckNotif(!checkNotif)
            console.log(data);
        })
    }
    useEffect(()=>{
        removeUserData()
    },[selectChat,message])
    


    useEffect(()=>{
        socket?.on('message receved',(newMessageReceived)=>{
           
          if(selectChat&&selectChat._id==newMessageReceived.chat._id){
            setMessage([...message,newMessageReceived]); 
            setResetUser(!resetUser);
          }
        })
        socket?.on('delete data',(data:any)=>{
            if(selectChat&&data.chatId==selectChat?._id&&userInfo._id!==data._id){
                toast.error(`Message deleted ${data.user_name}`);
                setIsdelete(!isdelete)
            }
            
        })
        return(()=>{
            socket?.off('delete data')
        })
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
      }, [NewMessage,selectChat]);

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
                                    isdelete={isdelete} setIsdelete={setIsdelete}
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
                <MessageInput setMessage={setMessage} message={message} socket={socket} socketConnected={socketConnected}
                NewMessage={NewMessage} setNewMessage={setNewMessage}
                />
            </div>
        </div>
    )
    
}


export default DisplayMessage