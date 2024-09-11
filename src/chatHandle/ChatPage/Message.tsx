// import React from 'react'

import MessageHedder from "../ChatComponents/MessageHedder"
import DisplayMessage from "../ChatComponents/DisplayMessage";


import { useChatState } from "../ChatContextApi/ContextApi";



function Message() {


  const { selectChat } = useChatState();


  return (
    <>
      {selectChat ? (<>
        <div className="h-full  bg-white">
          <div className="h-[70px]  bg-gray-100">
            <MessageHedder />
          </div>
          <div className="h-[535px] ">
            <DisplayMessage />
          </div>
        </div>
      </>) : (<>
        <div className="h-[606px] w-full bg-slate-100 flex items-center justify-center">

          <h1 className="font-light text-[30px]">Select Chat</h1>

        </div>
      </>)}

    </>
  )
}

export default Message