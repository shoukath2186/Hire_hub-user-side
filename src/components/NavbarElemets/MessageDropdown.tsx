

 import  { useEffect, useRef, useState } from 'react'
import { useChatState } from '../../chatHandle/ChatContextApi/ContextApi';
import { MdOutlineMessage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../datatypes.ts/IChatType';
import { axiosInstance } from '../../commonPages/Modal/APIforaxios';
import { toast } from 'react-toastify';


function MessageDropdown() {

    const [notifIsOpen, setNotifIsOpen] = useState<boolean>(false)

  const { notification,setSelectChat } = useChatState();
  const navigate = useNavigate();

  const MessageMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    
    if (MessageMenuRef.current && !MessageMenuRef.current.contains(event.target as Node)) {
      setNotifIsOpen(false); 
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openNotification=(notif:Notification)=>{
     
    axiosInstance.get(`/chat/getChatData?chatId=${notif.chat._id}`).then(({data})=>{

        setSelectChat(data)
        navigate('/chat')
        setNotifIsOpen(false); 
    }).catch((error)=>{
        toast.error(`Failed to retrieve chat data: ${error.response.data.message || 'Server error'}`);
        console.log(error);
        
    })

      
  }


  function CreateData(dateStr:string){
    const dateObj: Date = new Date(dateStr); 
   
    const date = dateObj.toLocaleDateString('en-GB');
    const time = dateObj.toLocaleTimeString('en-GB', { hour12: true });
   
    return {time: time,date:date}; 
  }

    return (
        <>
          <div className="relative">
            <MdOutlineMessage
              className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out"
              size={28}
              onClick={notification.length > 0 ? () => setNotifIsOpen(true) : () => navigate('/chat')}
            />
            {notification.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notification.length > 99 ? '99+' : notification.length}
              </div>
            )}
            {notifIsOpen && notification.length > 0 ? (
              
              <div ref={MessageMenuRef} 
              className='absolute right-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg  z-10'>
                <ul className='max-h-[350px] overflow-auto '>
                  {notification.map((notif) => (
                    <li key={notif._id} className='p-3 cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out'
                    onClick={()=>openNotification(notif)}>
                    <div className='flex  space-x-3 items-center'>
                      <div className='flex-shrink-0 w-10 h-10'>
                        <img src={notif.sender.profilePicture=='hello'?
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s':
                          notif.sender.profilePicture||'no Profile'
                        } alt="" className='w-full h-full rounded-full object-cover' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900'>{notif.sender.user_name}</p>
                        {
                           notif.contentType==='audio'?(
                            <p className="text-sm text-yellow-800"> <b>Audio</b> </p>
                           ):(
                             notif.contentType==='video'?(
                               <p className="text-sm text-yellow-800"> <b>Video</b> </p>
                              ):(
                               notif.contentType==='image'?(
                                 <p className="text-sm text-yellow-800"> <b>Image</b> </p>
                                ):(
                                 notif.contentType==='text'?(
                                   <p className="text-sm text-yellow-800"> Message: <b>{notif.content.slice(0,20)}{notif.content.length>20?'...':''}</b> </p>
                                  ):(
                                   <></>
                                  )
                                )
                              )
         
                           )
                        }
                        {/* <p className='text-sm text-gray-500 truncate'>{notif.content}</p> */}
                        <div className='flex items-center mt-1 text-xs text-gray-400 space-x-2'>
                          <span>{CreateData(notif.createdAt).date}</span>
                          <span>•</span>
                          <span>{CreateData(notif.createdAt).time}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  ))}
                </ul>
              </div>
            ) : (<></>)}
  
          </div>
        </>
      )
}

export default MessageDropdown