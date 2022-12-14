import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  CardMedia,
  Backdrop,
  Grid,
  Paper,
  TextField,
  Typography,
  Card,
  CardActionArea,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { useUserContext } from "../../context/user-context";
import userPhoto from "../../assets/IMG_0099.jpg";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const UserPage = () => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const { userProfile, editUserProfile, getCurrentUser, userLoading } =
    useUserContext();
  const [values, setValues] = useState({ ...userProfile });

  const handleSaveChanges = () => {
    if (!onEdit) {
      return;
    }
    const { email, name } = values;
    if (!email || !name || email === "" || name === "") {
      return;
    }
    editUserProfile({ newUser: values });
    setOnEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const backdropShowShow = () => {
    setShowBackdrop(true);
  };

  const backdropShowClose = () => {
    setShowBackdrop(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (userLoading) {
    return (
      <Paper
        sx={{
          display: "flex",
          gap: 3,
          m: 3,
          mt: 2,
          p: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 3,
        m: 3,
        mt: 2,
        p: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h3" color="secondary.common">
          User Profile
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={2}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6" width="8ch">
              Name:
            </Typography>
            <TextField
              variant="outlined"
              label={userProfile.name}
              value={onEdit ? values.name : ""}
              disabled={!onEdit}
              onChange={handleChange}
              name="name"
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Email:</Typography>
            <TextField
              variant="outlined"
              label={userProfile.email}
              value={onEdit ? values.email : ""}
              disabled={!onEdit}
              onChange={handleChange}
              name="email"
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Role:</Typography>
            <TextField variant="outlined" disabled value={values.role} />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Description:</Typography>
            <TextareaAutosize
              minRows={8}
              placeholder={userProfile.description || "user description..."}
              disabled={!onEdit}
              value={onEdit ? values.description : ""}
              onChange={handleChange}
              name="description"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6" width="8ch">
              City:
            </Typography>
            <TextField
              variant="outlined"
              label={values.city || "your city.."}
              value={onEdit ? values.city : ""}
              disabled={!onEdit}
              onChange={handleChange}
              name="city"
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">State:</Typography>
            <TextField
              variant="outlined"
              label={userProfile.state || "your state.."}
              value={onEdit ? values.state : ""}
              disabled={!onEdit}
              onChange={handleChange}
              name="state"
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">Website:</Typography>
            <TextField
              variant="outlined"
              disabled={!onEdit}
              value={onEdit ? values.website : ""}
              label={values.website || "your website..."}
              onChange={handleChange}
              name="website"
            />
          </Box>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 3, mb: 1 }}
            disabled={onEdit}
            component={Link}
            to="/home/user/password"
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            onClick={onEdit ? () => handleSaveChanges() : () => setOnEdit(true)}
          >
            {onEdit ? "Save Changes" : "Edit Profile"}
          </Button>
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={"auto"}>
          <Box>
            <Typography variant="h4">Profile Photo</Typography>
            <Card elevation={2} sx={{ bgcolor: "#fff", position: "relative" }}>
              <CardActionArea
                onMouseOver={backdropShowShow}
                onMouseLeave={backdropShowClose}
              >
                <CardMedia
                  component="img"
                  height="140"
                  src={userPhoto}
                  alt="user profile"
                  sx={{ objectFit: "scale-down" }}
                />
              </CardActionArea>
              <Backdrop
                onMouseOver={backdropShowShow}
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  position: "absolute",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                open={showBackdrop}
                onMouseLeave={backdropShowClose}
                onClick={backdropShowClose}
              >
                <Typography
                  sx={{
                    color: "tertiary.dark",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  Edit Photo
                </Typography>
              </Backdrop>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserPage;
