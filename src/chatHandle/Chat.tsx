
import Chaters from './ChatPage/Chaters'
import Message from "./ChatPage/Message";
import { useChatState } from "./ChatContextApi/ContextApi";


function Chat() {

    const {selectChat}=useChatState()

    return (
        <>
            <div className="bg-blue-100 min-h-[92vh]  p-0   sm:p-[30px]    flex items-center justify-center ">
                {/* <div className="bg-white w-full h-full    flex flex-row shadow-md"> */}

                   
                    <div className={`${selectChat ? 'hidden md:block md:w-[30%]' : 'w-full md:w-[30%]'} h-full `}>
                       <Chaters/>
                    </div>

                    
                    <div className={`${selectChat ? 'w-full md:w-[70%]' : 'hidden md:block md:w-[70%]'} bg-white`}>
                        <Message/>
                    </div> 

                {/* </div> */}
            </div>


        </>
    )
}

export default Chat