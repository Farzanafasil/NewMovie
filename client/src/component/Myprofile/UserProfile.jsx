
import { Box } from "@mui/system";
import React, {  Fragment,useEffect, useState } from "react";

import { List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
const Myprofile = () => {
  const [user, setuser] = useState();
   
  useEffect(() => {
  try {
  const userId=localStorage.getItem("userId")
  console.log(userId)
   axios.get(`http://localhost:5000/api/user/${userId}`).then((response)=>{

      console.log(response.data.user)
      setuser(response.data.user)
    
 
  
 })


} catch (error) {
  console.log(error)
  
}



  },[])
    
  
  return (
  

  <Box width={"100%"} display="flex">
    <Fragment>
      {" "}
      {user && (
        <Box
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
          width={"30%"}
          padding={3}
        >
          <AccountCircleIcon
            sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
          />

          <Typography
            mt={1}
            padding={1}
            width={"auto"}
            textAlign={"center"}
            border={"1px solid #ccc"}
            borderRadius={6}
          >{user.name}
           
          
          </Typography>
          
          <Typography
            mt={1}
            padding={1}
            width={"auto"}
            textAlign={"center"}
            border={"1px solid #ccc"}
            borderRadius={6}
          > {user.email}</Typography>
        </Box>
      )}
      
    </Fragment>
  </Box>
  );
};


export default Myprofile