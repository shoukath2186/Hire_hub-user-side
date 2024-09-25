import { FaPhone, FaPhoneSlash } from "react-icons/fa";
import { SockerContext } from "../../socketProvider/Socket";
import { useSelector } from "react-redux";
import { AuthState } from "../../datatypes.ts/IUserData";
import { useNavigate } from "react-router-dom";
import { useChatState } from "../../chatHandle/ChatContextApi/ContextApi";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import { toast } from "react-toastify";


const Calling:React.FC=()=> {

    const {setCalling, calling,socket,socketConnected } = SockerContext();

    const { userInfo } = useSelector((state: AuthState | any) => state.auth);

    const { setSelectChat } = useChatState();
  const navigate = useNavigate();
    
    const acceptCall=()=>{
       if(calling){
        const { from, signal, user,userId,chatId } = calling; 
        
        axiosInstance.get(`/chat/getChatData?chatId=${chatId}`).then(({data})=>{

            setSelectChat(data)
            navigate(`/videoCall?creater=${false}`,{state:data});
            setCalling(null);
            socket.emit('accept-call', { rejecter: userInfo._id, from, signal, user,userId });
        }).catch((error)=>{
            toast.error(`Failed to retrieve chat data: ${error.response.data.message || 'Server error'}`);
            console.log(error);
            
        })
        
       }
    }

    const rejectCall=()=>{
        if(socketConnected){
            if (calling) {
                const { from, signal, user,userId } = calling; 
                socket.emit('reject-call', { rejecter: userInfo._id, from, signal, user,userId });
              }
             setCalling(null)
        }
    }

    return (
        <div className="relative">
        {calling && (
          <div className="absolute top-0 left-0 mt-10 mr-4 w-50 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <div className="mb-6 text-white text-lg font-semibold">
                Incoming Call...
              </div>
  
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500 animate-ping mr-4"></div>
                <div className="w-10 h-10 rounded-full bg-red-500 animate-ping"></div>
              </div>
  
              <ul className="mb-4 text-white">
                <li>Caller: {calling.user}</li>
               
              </ul>
  
              <div className="flex justify-center space-x-6">
                <button 
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition duration-200"
                   onClick={acceptCall}
                >
                  <FaPhone className="text-white text-2xl" />
                </button>
  
                <button 
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-200"
                  onClick={rejectCall}
                >
                  <FaPhoneSlash className="text-white text-2xl" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      )
}

export default Calling