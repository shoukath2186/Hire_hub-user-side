import { createContext, useContext, useState, ReactNode } from 'react';
import { Chat,Notification } from '../../datatypes.ts/IChatType';


interface ChatContextType {
  selectChat: Chat | null;
  setSelectChat: (chat: Chat | null) => void;

  chats: Chat[] ;
  setChats: (chats: Chat[] ) => void; 


  notification: Notification[];
  setNotification: (notifications: Notification[]) => void;

  isTyping:boolean;
  setIsTyping:(typoing:boolean)=>void;

  typing:boolean;
  setTyping:(typoing:boolean)=>void;

  resetUser:boolean,
  setResetUser:(typoing:boolean)=>void;
}



const ChatContext = createContext<ChatContextType | undefined>(undefined);


interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

  const [selectChat, setSelectChat] = useState<Chat | null>(null);

  const [chats, setChats] = useState<Chat[] >([]);

  const [notification, setNotification] = useState<Notification[]>([]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const [typing, setTyping] = useState<boolean>(false);

  const [resetUser,setResetUser]=useState(false)


 

 

  return (
    <ChatContext.Provider value={{ selectChat, setSelectChat, chats, setChats, notification, setNotification, isTyping , setIsTyping,typing, setTyping,resetUser,setResetUser }}>
      {children}
    </ChatContext.Provider>
  );
};


export const useChatState = (): ChatContextType => {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error('useChatState must be used within a ChatProvider');
  }
  
  return context;
};

export default ChatProvider;
