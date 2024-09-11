
// import React from 'react'
import ChatHedder from "../ChatComponents/ChatHedder"
import ChatUsers from "../ChatComponents/ChatUsers"


function Chaters() {
  return (
    <>
    <div className="h-full ">
      <div className="h-[60px] ">
      <ChatHedder/>
      </div>
      <div className="bg-white  ">
      <ChatUsers/>
      </div>
   
     </div>

    </>
  )
}

export default Chaters