
import { Box } from "@mui/system";
import React, {  Fragment,useEffect, useState } from "react";

import { List, ListItem, ListItemText, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

const TheaterProfile = () => {
    const [admin, setAdmin] = useState();
   
    useEffect((theaterId) => {
    try {
    const theaterId=localStorage.getItem("theaterId")
    console.log(theaterId)
     axios.get(`http://localhost:5000/api/theater/${theaterId}`).then((response)=>{

        console.log(response.data.TheaterAdmin)
       setAdmin(response.data.TheaterAdmin)
   
    
   })


} catch (error) {
    
}



    },[])
      
    console.log(admin);
    return (
    

    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {admin && (
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
            >
             {admin.email}
            </Typography>
          </Box>
        )}
        
      </Fragment>
    </Box>
    );
  };

export default TheaterProfile