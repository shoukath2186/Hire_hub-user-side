import { useEffect, useState } from "react";
import { Chat } from "../../datatypes.ts/IChatType";
import { AuthState } from "../../datatypes.ts/IUserData";
import { displayChatsLogic } from "../Config/ChatListLogic";
import { useChatState } from "../ChatContextApi/ContextApi";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import { useSelector } from "react-redux";


function ChatUsers() {
  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [displayChat, setDisplayChat] = useState<Chat[]>();

  const { setSelectChat, selectChat, setChats, chats } = useChatState();

  useEffect(() => {
    axiosInstance.get('/chat/allChat')
      .then(({ data }) => {
        setChats(data);
       
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chats]);

  useEffect(() => {
    if (chats && userInfo._id) {
      const data: Chat[] = displayChatsLogic(chats, userInfo._id);
      setDisplayChat(data);
    }
  }, [chats, userInfo]);

  function selectdUser(chat: Chat) {

    setSelectChat(chat)


  }

  return (

    <>
      <div className="h-[545px] pb-[200px] overflow-x-auto">
        {displayChat ? (<>
          {displayChat && displayChat.map((userArray) => (

            <div key={userArray._id}
              className={`h-18 flex items-center justify-between p-3 border-gray-200 border-[.5px] hover:cursor-pointer ${userArray._id === selectChat?._id ? 'bg-blue-300' : 'bg-white'}`}
              onClick={() => selectdUser(userArray)}
            >
              <div className=" min-w-12 h-12 overflow-hidden rounded-full border-2 border-blue-300">
                <img
                  src={userArray.users[0].profilePicture === 'hello'
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
                    : userArray.users[0].profilePicture || '/api/placeholder/64/64'}

                  alt={userArray.users[0].user_name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow ml-4">
                <h2 className="text-lg font-semibold text-black-800">{userArray.users[0].user_name || 'User Name'}</h2>
                
                 
                
                  {userArray?.lastMessage?.contentType?(
                        userArray.lastMessage.contentType==='audio'?(
                          <p className="text-sm text-yellow-800"> Message: <b>Audio</b> </p>
                         ):(
                           userArray.lastMessage.contentType==='video'?(
                             <p className="text-sm text-yellow-800"> Message: <b>Vider</b> </p>
                            ):(
                             userArray.lastMessage.contentType==='image'?(
                               <p className="text-sm text-yellow-800"> Message: <b>Image</b> </p>
                              ):(
                               userArray.lastMessage.contentType==='text'?(
                                 <p className="text-sm text-yellow-800"> Message: <b>{userArray.lastMessage.content.slice(0,20)}{userArray.lastMessage.content.length>20?'...':''}</b> </p>
                                ):(
                                 <></>
                                )
                              )
                            )
       
                         )
                  ):(<><p>Ne Message</p></>)}
                  {}
                  
               
              </div>
              <div>
               
              </div>
            </div>

          ))}
        </>) : (<>
          <div className="flex items-center justify-center h-full">
            <h1 className="p-10 text-xl font-semibold text-center text-gray-700">
              No active chat selected. Please find a user to start a conversation.
            </h1>
          </div>  
        </>)}

      </div>
    </>
  );
}

export default ChatUsers;
