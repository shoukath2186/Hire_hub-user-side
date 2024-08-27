// import React from 'react'

import { Box, Typography } from "@mui/material"

import { UserDataUpdate } from "../../../../datatypes.ts/IUpdateForm";

const UserInfo:React.FC<{user:UserDataUpdate}>=({user}) =>{
  return (
    <> 
        <Box className=" bg-gray-200 p-8 max-w-2xl mx-auto my-12 rounded-xl shadow-md">
    <Typography variant="h4" className="text-indigo-700 font-semibold  border-b-2  mb-10 pb-7 text-center ">
      User Information
    </Typography>

    {[
      { label: "First Name", value: user.user_name },
      { label: "Last Name", value: user.last_name },
      { label: "Email", value: user.email },
      user.phone==0?{label: "Phone", value: 'No Phone Number'} :{ label: "Phone", value: user.phone },
      { label: "User Role", value: user.user_role }
    ].map((item, index) => (
      <Box
        key={index}
        className="mb-6 p-4 bg-white rounded-lg transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
      >
        <Typography variant="caption" className="text-teal-600 font-semibold block mb-1">
          {item.label.toUpperCase()}
        </Typography>
        <Typography variant="body1" className="text-gray-700">
          {item.value}
        </Typography>
      </Box>
    ))}
  </Box>
  </>
  )
}

export default UserInfo