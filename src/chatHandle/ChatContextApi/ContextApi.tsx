import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Chat } from '../../datatypes.ts/IChatType';


interface ChatContextType {
  selectChat: Chat | null;
  setSelectChat: (chat: Chat | null) => void;

  chats: Chat[] ;
  setChats: (chats: Chat[] ) => void;


  notification: Notification[];
  setNotificationHandil: (notifications: Notification[]) => void;

  isTyping:boolean;
  setIsTyping:(typoing:boolean)=>void;

  typing:boolean;
  setTyping:(typoing:boolean)=>void
}



interface Message {
  id: string;
  sender?: string;
  content: string;
  timestamp: Date;
}

interface Notification {
  id: string;
  message: Message;
  isRead: boolean;
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


  const setNotificationHandil=(notif:Notification[])=>{
      setNotification(notif)
      console.log(1234,notification,1111,notif);
  
  } 

 

  return (
    <ChatContext.Provider value={{ selectChat, setSelectChat, chats, setChats, notification, setNotificationHandil, isTyping , setIsTyping,typing, setTyping }}>
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
