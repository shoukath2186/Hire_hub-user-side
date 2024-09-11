import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { IoSearch } from "react-icons/io5";
import { axiosInstance } from '../../commonPages/Modal/APIforaxios'; 
import { useChatState } from "../ChatContextApi/ContextApi";
import { IoMdClose } from "react-icons/io";
import { User } from '../../datatypes.ts/IChatType';

type Anchor = 'left';



export default function SwipeableTemporaryDrawer() {

  const [state, setState] = React.useState({
    left: false,
  });

  const [search,setSearch]=React.useState<string>('');
  const [loading,setLoading]=React.useState<boolean>(false);
  const [users,setUser]=React.useState<User[]|[]>([]);

  const {setSelectChat,setChats,chats }=useChatState()


  const toggleDrawer = (anchor: Anchor, open: boolean) => 
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {

        return;
      }
      setSearch('')
      // setUser([]);
      setState({ ...state, [anchor]: open });
    };



    async function serchUser(){

     if(!search.trim()){
       return
     }
     setLoading(true);
     try {
       const {data}= await axiosInstance.get(`/chat?search=${search}`)

       
       setUser(data)
       setLoading(false)

       
     } catch (error) {
      console.log(error);
      setLoading(false)

      
     }



    }

    async function accessChat(userId:string) {
        try {
          const {data}=await axiosInstance.post('/chat',{userId})

        
          setSelectChat(data[0]);

          if (chats.length > 0) {
           
            setChats([...data, ...chats.filter((chat)=>chat._id!==data[0]._id)]);
          } else {
            setChats([...data])
          }
     
            setState({left: false})
          
         
          
        } catch (error) {
          console.log(error);
           
        }
    }


  const list = () => (
    <Box
      sx={{ width: 350, padding: 2 }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
     <IoMdClose className='hover:cursor-pointer ' onClick={()=>setState({left: false})}/>
      <div className="flex items-center justify-center h-12 mb-4">
        <h1 className="text-2xl font-semibold text-blue-700">Search</h1>
      </div>
      <div className="flex items-center mb-4">
        <input 
          type="text" 
          value={search}
          placeholder="Search..." 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
          className="w-full p-2 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
           onClick={serchUser}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md transition duration-300 ease-in-out"
        >
          <IoSearch size={25} />
        </button>

       
      </div>
      
     {loading?(
        <p>Loading...</p>
     ):(
          users&&users.length>0?users.map((user)=>( 
            <div key={user._id} className="bg-gray-200 h-16 flex items-center justify-between p-3 hover:cursor-pointer   my-3 shadow-md" onClick={()=>accessChat(user._id)}>
            <div className="w-12 h-12 overflow-hidden rounded-full border-2 border-blue-300">
              {user.profilePicture=='hello'?(
                <img 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s' 
                alt="no" 
                className="w-full h-full object-cover"
              />
              ):(
                 <img 
                 src={user.profilePicture} 
                 alt="Profile" 
                 className="w-full h-full object-cover"
               />
              )}
             
            </div>
            <div className="flex-grow ml-4">
              <h2 className="text-lg font-semibold text-black-800">{ user.user_name}</h2>
              <p className="text-sm text-yellow-800">{user.email}</p>
            </div>
          </div> 
           )):(<p className="text-blue-600">No Users.</p>)
            
      
     )}

    

    </Box>
  );

  return (
    <div>
      <span onClick={toggleDrawer('left', true)}>
        <IoSearch size={25} className="hover:cursor-pointer" />
      </span>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
