
import {  useState } from "react";
// import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import { useChatState } from "../ChatContextApi/ContextApi";
import { MessageType } from "../../datatypes.ts/IChatType";
import AudioModal from "../ChatModal/AudioRecordModal";
import FilelTakeModel from "../ChatModal/FilelTakeModel";
import { Socket } from "socket.io-client";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';

interface MessageInputProps {
    setMessage: (message: MessageType[]) => void;
    message: MessageType[];
    socket: Socket|null;
    socketConnected: boolean
    NewMessage:boolean
    setNewMessage:(NewMessage:boolean)=>void
}

const MessageInput: React.FC<MessageInputProps> = ({ setMessage, message, socket, socketConnected,NewMessage,setNewMessage }) => {

    const [inputValue, setInputValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<any >(null);



    const { selectChat,  setTyping, typing} = useChatState();

    

    const saveMassage = async () => {

        socket?.emit("stop typing", selectChat?._id);
        setTyping(false);
        setTyping(false);

        if (!inputValue.trim()) {
            setInputValue('')
            return
        }

        try {

            const { data } = await axiosInstance.post('/chat/message', { value: inputValue, chatId: selectChat?._id })
            // console.log('new message:', data);
            setMessage([...message, data])
            setNewMessage(!NewMessage);
            socket?.emit("new message", data);
            setInputValue('')  

        } catch (error) {
            if (error instanceof AxiosError) {
                setInputValue('')  
                if (error.response) {
                    toast.error(error.response.data || 'An error occurred.');
                } else {
                   
                    toast.error('Something went wrong. Please try again.');
                }
            }

        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveMassage();
        }
    };

    const userTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    
        if (!socketConnected) return;
    
        if (!typing) {
            setTyping(true);
            socket?.emit("typing", selectChat?._id);
        }
    
       
        if (typingTimeout) clearTimeout(typingTimeout);
    
        let lastTypingTime = new Date().getTime();
        let typingDelay = 3000;
    
        
        setTypingTimeout(
            setTimeout(() => {
                let timeNow = new Date().getTime();
                let timeDiff = timeNow - lastTypingTime;
    
                if (timeDiff >= typingDelay && typing) {
                    socket?.emit("stop typing", selectChat?._id);
                    setTyping(false);
                }
            }, typingDelay)
        );
        
    }

    return (
        <div className="w-full bg-gray-200  shadow-md h-[50px]  p-2 flex items-center space-x-2">
            {/* {isTyping? (<button className="text-gray-400 hover:text-gray-600 pl-2 focus:outline-none">
                typing
            </button>) : null} */}



            <button className="text-gray-400 hover:text-gray-600 p-2 focus:outline-none">
                <FilelTakeModel setMessage={setMessage} message={message} socket={socket} NewMessage={NewMessage} setNewMessage={setNewMessage}/>
            </button>
            <input
                type="text"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Type a message..."
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={userTyping}
            />
            <button className="text-blue-500 hover:text-blue-600 focus:outline-none p-2">
                {inputValue ? (<IoSend size={20} onClick={saveMassage} />) : 
                (<AudioModal setMessage={setMessage} message={message} socket={socket} NewMessage={NewMessage} setNewMessage={setNewMessage} />)}
            </button>
        </div>
    )
}

export default MessageInput