
import { IoArrowBack } from "react-icons/io5";
import { useChatState } from "../ChatContextApi/ContextApi";
import { MessageHedderLogic } from "../Config/ChatListLogic";
import { useSelector } from "react-redux";
import { AuthState } from "../../datatypes.ts/IUserData";
import { CiMenuBurger } from "react-icons/ci";
import { useCallback, useEffect, useRef, useState } from "react";
import UserProfileViewModal from "../ChatModal/ProfileModal";
import { SockerContext } from "../../socketProvider/Socket";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import CustomModal from "../../commonPages/Modal/LogoutModal";
import { CiVideoOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MessageHedder() { 

  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");


  const { setSelectChat, selectChat, isTyping, typing, setResetUser, resetUser } = useChatState();
  const menuRef = useRef<HTMLDivElement>(null);

  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const { socket } = SockerContext();


  const takeUserData = () => {
    if (selectChat) {
      const data = MessageHedderLogic(selectChat, userInfo._id);
      return data
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const checkOnlineStatus = useCallback(() => {
    if (socket) {
      socket.emit('check online status', takeUserData()?.users[0]._id );
    }
  }, [socket,selectChat]);

  useEffect(() => {

    if (socket && selectChat) {
      socket.on('user online', (userId: string) => {
        if (takeUserData()?.users[0]._id === userId) {
          setIsOnline(true)
        }
      })
    }

    socket.on('online status', (data) => {
      if (data.userId === takeUserData()?.users[0]._id) {
        setIsOnline(data.isOnline);
      }
    });

    socket.on('user offline', (userId: string) => {
      if (takeUserData()?.users[0]._id == userId) {
        setIsOnline(false)
      }
    })
    
    checkOnlineStatus();
      const intervalId = setInterval(checkOnlineStatus, 30000);

    return () => {
      socket.off('user online');
      socket.off('user offline');
      clearInterval(intervalId);
    }
  }, [socket, selectChat])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleModal = async () => {
    const newBlockStatus = !selectChat?.Block;
    axiosInstance.patch(`/chat/blockChat?chatId=${selectChat?._id}`).then(({ data }) => {



      const updatedChat: any = {
        ...selectChat,
        Block: newBlockStatus,
        blocker: newBlockStatus ? userInfo._id : ''
      };
      setSelectChat(updatedChat);
      setResetUser(!resetUser)
      console.log(data);
      handleClose();
    })
  }


  const blockChat = () => {

    if (selectChat?.Block) {
      setModalHeading('Unblock Chat');
      setModalMessage('Are you sure you want to unblock this chat? Once unblocked, you will start receiving messages from this user again.');
    } else {
      setModalHeading('Block Chat');
      setModalMessage('Are you sure you want to block this chat? Once blocked, you will no longer receive messages from this user.');
    }
    handleOpen()

  }
  const navigate=useNavigate()

  const handleVideoCall=async ()=>{
    if(selectChat?.Block){
      toast.info('This chat has been blocked by the recipient.');
      return 
    } 
   
 
  navigate(`/videoCall?creater=${true}`,{state:selectChat})  
  
 
  
  }


  return (
    <div className="w-full bg-[#a4a4a9b3] h-full flex items-center justify-between px-5 relative ">
      <CustomModal open={open} handleClose={handleClose} handleModal={handleModal} title={modalHeading} message={modalMessage} />

      <IoArrowBack className="md:hidden" onClick={() => setSelectChat(null)} />
      <div className="md:ml-4 flex">
        <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-blue-300">
          <img
            src={takeUserData()?.users[0].profilePicture == 'hello'
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
              : takeUserData()?.users[0].profilePicture || '/api/placeholder/64/64'}

            alt={takeUserData()?.users[0].user_name || 'Profile'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="font-semibold text-[20px] m-0 text-blue-900">{takeUserData()?.users[0].user_name}</p>

          {!typing && isTyping ? (
            <p className="text-green-600 font-bold text-[10px]">Typing...</p>
          ) : isOnline ? (<>
            <p className="text-blue-600 font-bold text-[10px]">Online</p>
          </>) : (
            <p className="m-0 text-[10px]">{takeUserData()?.users[0].email}</p>
          )

          }

        </div>
      </div>
      <div className=" flex  space-x-8 item-center justify-center">
        <div className="hover:cursor-pointer  hover:scale-125 transition-transform">
          <CiVideoOn size={28} onClick={handleVideoCall}/>
        </div>  
        <div className=" flex items-center justify-center ">
        <CiMenuBurger className="hover:cursor-pointer mr-2 " onClick={toggleMenu} size={22} />
        {menuOpen && (
          <div ref={menuRef} className="absolute z-10  right-4 top-[45px] w-48 bg-white  border border-gray-300 shadow-lg" >

            <ul className="py-2">
              <UserProfileViewModal Chater={takeUserData()?.users[0]} />
              {takeUserData()?.Block && takeUserData()?.blocker == userInfo._id ? (
                <li className="px-4 py-2 text-green-700 hover:bg-blue-100 cursor-pointer" onClick={blockChat}>
                  Unblock Chat
                </li>
              ) :
                takeUserData()?.Block ? (
                  <li className="px-4 py-2 font-bold text-red-700 ">
                    Blockd Chat
                  </li>
                ) : (
                  <li className="px-4  py-2 text-red-700 hover:bg-blue-100 cursor-pointer" onClick={blockChat}>
                    Block Chat
                  </li>
                )
              }

              {/* <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Block
            </li> */}
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default MessageHedder