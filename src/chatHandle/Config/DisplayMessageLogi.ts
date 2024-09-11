
import { MessageType } from "../../datatypes.ts/IChatType";

interface SameUserProps {
    message: MessageType;
    nextMessage:MessageType|undefined
  }

export const sameUser=({ message,nextMessage }: SameUserProps):boolean=>{
   if(!nextMessage||message.sender._id!=nextMessage.sender._id||formatDate(message.createdAt)!=formatDate(nextMessage.createdAt)){
    return true
   }else{
   return false
   }

}



interface CheckDate{
    message:MessageType,
    prevMessage:MessageType|undefined,
}
export const formatDate = (mongoDate: any): string => {  
    const date = new Date(mongoDate);
    return date.toLocaleDateString(); 
  };
export const sameData=({ message,prevMessage }:CheckDate):boolean=>{
    
    if(prevMessage&& formatDate(message.createdAt)!=formatDate(prevMessage.createdAt)){
        return true
        
    }else if(!prevMessage){
        return true
    }
    
    return false
}