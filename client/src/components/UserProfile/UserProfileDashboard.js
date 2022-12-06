import React, { useState } from "react";

import userPhoto from "../../assets/IMG_0099.jpg";

import { useAuthContext } from "../../context/auth-context";

import { Card, ButtonGroup, Backdrop } from "@mui/material/";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import PointOfSaleSharpIcon from "@mui/icons-material/PointOfSaleSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

const UserProfileDashboard = () => {
  const { user } = useAuthContext();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const backdropShowHadnler = () => {
    setShowBackdrop(!showBackdrop);
  };

  const backdropShowClose = () => {
    setShowBackdrop(false);
  };

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea
        onMouseOver={backdropShowHadnler}
        onMouseLeave={backdropShowClose}
      >
        <CardMedia
          component="img"
          height="240"
          src={userPhoto}
          alt="user profile"
          sx={{ objectFit: "scale-down" }}
        />
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "relative",
          }}
          open={showBackdrop}
          onClick={backdropShowClose}
        >
          <Typography>Edit Profile</Typography>
        </Backdrop>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          variant="text"
          aria-label="outlined primary button group"
          color="tertiary"
          size="large"
          sx={{ gap: 2 }}
        >
          <Button endIcon={<FormatListBulletedSharpIcon />}>My Tasks</Button>
          <Button endIcon={<PointOfSaleSharpIcon />}>My Expanses</Button>
          <Button
            startIcon={<LogoutSharpIcon />}
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default UserProfileDashboard;
