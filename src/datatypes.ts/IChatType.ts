
export interface Message{
    sender: string;
    content: string;
    contentType:string;
    chat: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Chat {
    lastMessage:Message;
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: User[];
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}
  
export interface User {
    _id: string;
    user_name: string;
    email: string;
    user_role: 'employer' | 'seeker'; 
    profilePicture: string;
  }
export interface   MessageOnChat{
    lastMessage:Message;
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: string[];
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}

  export interface MessageType{
    _id: string;
    content: string;
    contentType: string;
    sender: User; 
    chat: MessageOnChat;  
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  

 