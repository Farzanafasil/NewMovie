import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      axios.get(`http://localhost:5000/api/user/${userId}`).then((response) => {
        setUser(response.data.user);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    // Update user profile with the new data
    // You can make an API request here to update the user's information
    // For example, axios.put(`http://localhost:5000/api/user/${user.id}`, { newPassword });
    setEditing(false);
  };

  const handleImageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleImageClose = () => {
    setAnchorEl(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Handle the file upload, you can send it to a server or update the user's profile
    console.log("Uploaded file:", file);
    handleImageClose();
  };

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        mt={4}
      >
        <AccountCircleIcon sx={{ fontSize: "10rem" }} onClick={handleImageClick} />
        <Typography variant="h4" mt={2}>
          {user.name}
        </Typography>
        <Typography variant="body1" mt={1}>
          {user.email}
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          mt={2}
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>

        {editing ? (
          <Card variant="outlined" mt={2}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSaveProfile}
                >
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : null}

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleImageClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="h6">Upload Profile Image</Typography>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                color="primary"
                fullWidth
              >
                Browse
              </Button>
            </label>
          </Box>
        </Popover>
      </Box>
    </Container>
  );
};

export default MyProfile;