
import { IoArrowBack } from "react-icons/io5";
import { useChatState } from "../ChatContextApi/ContextApi";
import { MessageHedderLogic } from "../Config/ChatListLogic";
import { useSelector } from "react-redux";
import { AuthState } from "../../datatypes.ts/IUserData";
import { CiMenuBurger } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import UserProfileViewModal from "../ChatModal/ProfileModal";

function MessageHedder() {

  const [menuOpen, setMenuOpen] = useState(false);
  const { setSelectChat, selectChat,isTyping,typing } = useChatState();
  const menuRef=useRef<HTMLDivElement>(null)

  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
 

  const takeUserDtat = () => {
    if (selectChat) {
      const data = MessageHedderLogic(selectChat, userInfo._id);
      return data
    }
  }

  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const viewProfile=(user:User|undefined)=>{
  //   toggleMenu()
  //    console.log("user data: ",user);
     
  // }


  return (
    <div className="w-full bg-[#a4a4a9b3] h-full flex items-center justify-between px-5 relative ">
     
     
      <IoArrowBack className="md:hidden" onClick={() => setSelectChat(null)} />
      <div className="md:ml-4 flex">
        <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-blue-300">
          <img
            src={takeUserDtat()?.users[0].profilePicture == 'hello'
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
              : takeUserDtat()?.users[0].profilePicture || '/api/placeholder/64/64'}

            alt={takeUserDtat()?.users[0].user_name || 'Profile'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
        <p className="font-semibold text-[20px] m-0 text-blue-900">{takeUserDtat()?.users[0].user_name}</p>
        {!typing&&isTyping?(
          <p className="text-green-600 font-bold text-[10px]">Typing...</p>
        ):(
           <p className="m-0 text-[10px]">{takeUserDtat()?.users[0].email}</p>
        )}
       
        </div>
      </div>
      <CiMenuBurger className="hover:cursor-pointer " onClick={toggleMenu} />
      {menuOpen && (
        <div ref={menuRef} className="absolute z-10  right-4 top-[45px] w-48 bg-white  border border-gray-300 shadow-lg" >

          <ul className="py-2">
          <UserProfileViewModal Chater={takeUserDtat()?.users[0]}/>
            {/* <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Remove User
            </li> */}
            {/* <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Block
            </li> */}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MessageHedder