// import React from 'react'

import SwipeableTemporaryDrawer from "../ChatModal/SearchDrawer";


function ChatHedder() {

  

  return (
    <div className="bg-slate-300 h-full flex items-center justify-between px-4">
     
      <div>
        <h1 className="text-yellow-600 font-semibold text-[25px]">Message</h1>
      </div>
      <SwipeableTemporaryDrawer/>
    
       
    </div>
  )
}

export default ChatHedder