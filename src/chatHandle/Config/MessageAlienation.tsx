

import { useState } from "react";
import { MessageType } from "../../datatypes.ts/IChatType";
import { sameUser } from "./DisplayMessageLogi";
import { sameData } from "./DisplayMessageLogi";
import { MdDelete } from "react-icons/md";
import CustomModal from "../../commonPages/Modal/LogoutModal";
import { toast } from "react-toastify";
import { axiosInstance } from "../../commonPages/Modal/APIforaxios";
import { SockerContext } from "../../socketProvider/Socket";


interface ChatMessageProps {
  message: MessageType,
  isOwnMessage: boolean,
  nextMessage: MessageType | undefined,
  prevMessage: MessageType | undefined,
  setIsdelete: (isdelete: boolean) => void,
  isdelete: boolean
}


const MessageAlination: React.FC<ChatMessageProps> = ({ message, isOwnMessage, nextMessage, prevMessage, isdelete, setIsdelete }) => {

  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const [selectMessageData, setSelectMessageData] = useState<MessageType>()
  const { socket } = SockerContext();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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

  const handleModal = async () => {
    if (selectMessageData) {

      axiosInstance.put(`/chat/delete`, selectMessageData).then(({ data }) => {
        socket?.emit('delete Messsage', { users: selectMessageData.chat.users, ...data, chatId: selectMessageData.chat._id });
        handleClose()
        setIsdelete(!isdelete)
      })
    } else {
      toast.error('no selected chat.')
      handleClose()
    }


  }

  function onMessageDelete(messageData: MessageType) {
    setSelectMessageData(messageData); 
    handleOpen();
    setModalHeading('Confirm Deletion');
    setModalMessage(`Are you sure you want to delete this message?`);
  }

  const isUrl = (str:string) => {
    const urlPattern = /^(https?:\/\/)?(localhost)(:\d{1,5})(\/\S*)?(\?\S*)?$/;
    return urlPattern.test(str);
  };


  return (
    <>
      <CustomModal open={open} handleClose={handleClose} handleModal={handleModal} title={modalHeading} message={modalMessage} />
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
          <div className="flex justify-between">
            <p className="font-semibold text-[13px]">{message.sender.user_name}</p>
            <button
              onClick={() => onMessageDelete(message)}
              className="group relative p-1 rounded-full  transition-colors duration-200"
              aria-label="Delete message"
            >
              <MdDelete className="text-gray-400 group-hover:text-red-500 transition-colors duration-200" size={15} />
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded-md -top-8 -left-1/2 transform -translate-x-1/2">
                Delete
              </span>
            </button>
          </div>

          {message.contentType == 'text' ? (<>
            {isUrl(message.content) ? (
              <p>
                <a
                  href={message.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {message.content}
                </a>
              </p>
            ) : (
              <p>{message.content}</p>
            )}

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