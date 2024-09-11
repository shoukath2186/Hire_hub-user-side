

import { MessageType } from "../../datatypes.ts/IChatType";
import { sameUser } from "./DisplayMessageLogi";
import { sameData } from "./DisplayMessageLogi";


interface ChatMessageProps {
  message: MessageType,
  isOwnMessage: boolean,
  nextMessage: MessageType | undefined,
  prevMessage: MessageType | undefined,
}


const MessageAlination: React.FC<ChatMessageProps> = ({ message, isOwnMessage, nextMessage, prevMessage }) => {



  const LocalTime = (value: any) => {
    const updatedAt = value;
    const date = new Date(updatedAt);
    const localTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return localTime;
  }


  const formatDate = (mongoDate: string): string => {
    const date = new Date(mongoDate);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <>
      {sameData({ message, prevMessage }) ? (<>
        <div className="flex  justify-center">
          <p className="bg-yellow-100 p-1 border-2 mt-1 rounded-lg">
            {formatDate(message.createdAt)}
          </p>
        </div>
      </>) : (<></>)}
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} `}>
        {!isOwnMessage ? (<>
          <div className="w-8 h-8 m-2 mr-0 ">
            {sameUser({ message, nextMessage }) ? (<>
              <img src={message.sender.profilePicture} className="rounded-full" alt="" />
            </>) : (<>

            </>)}
          </div>
        </>) : (<>

        </>)}
        <div className={`px-3  m-1 rounded-2xl mx-2  ${isOwnMessage ? 'bg-blue-200' : 'bg-gray-200'} `}>
          <p className="font-semibold text-[13px]">{message.sender.user_name}</p>
          {message.contentType == 'text' ? (<>
            <p>{message.content}</p>

          </>) : (<>
            {message.contentType == 'audio' ? (<>
              <div className="relative w-[250px] p-2 border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                <audio
                  src={message.content}
                  className="w-full"
                  controls
                >
                 
                </audio>
              </div>
              
            </>) : (<>
              {message.contentType == 'video' ? (<>

                <div className="relative w-[250px]   flex items-center justify-center  ">
                  <video
                    src={message.content}
                    className="w-full  object-cover"
                    controls
                    
                  />
                </div>
              </>) : (<>
                {message.contentType == 'image' ? (<>
                  <div className="relative w-[250px]  flex items-center justify-center overflow-hidden">
                    <img
                      src={message.content}
                      alt="Message Image"
                      className="w-full  object-cover "
                    />
                  </div>
                </>) : (<>

                </>)}
              </>)}
            </>)}
          </>)}
          <p className="text-[10px] text-end">{LocalTime(message.createdAt)}</p>
        </div>

      </div>

    </>
  )
}

export default MessageAlination