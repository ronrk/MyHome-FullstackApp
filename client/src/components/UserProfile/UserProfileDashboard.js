import React, { useState } from "react";
import { Link } from "react-router-dom";

import userPhoto from "../../assets/IMG_0099.jpg";

import { useAuthContext } from "../../context/auth-context";

import {
  Card,
  ButtonGroup,
  Backdrop,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Grid,
} from "@mui/material/";

import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import PointOfSaleSharpIcon from "@mui/icons-material/PointOfSaleSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { bgcolor } from "@mui/system";

const UserProfileDashboard = () => {
  const { user, logout } = useAuthContext();
  const [showBackdrop, setShowBackdrop] = useState(false);

  const backdropShowShow = () => {
    setShowBackdrop(true);
  };

  const backdropShowClose = () => {
    setShowBackdrop(false);
  };

  return (
    <Card elevation={4} sx={{ maxWidth: 600, bgcolor: "darkBlue.widhOpacity" }}>
      <CardActionArea
        onMouseOver={backdropShowShow}
        onMouseLeave={backdropShowClose}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 1 }}
        >
          <Grid>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h3"
                color="primary.dark"
                textTransform="capitalize"
              >
                {user.name}
              </Typography>
              <Typography variant="body2" color="secondary.common">
                {user.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.description}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={0}>
            <CardMedia
              component="img"
              height="140"
              src={userPhoto}
              alt="user profile"
              sx={{ objectFit: "scale-down" }}
            />
            <Backdrop
              onMouseOver={backdropShowShow}
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                position: "absolute",
                textDecoration: "none",
              }}
              open={showBackdrop}
              onClick={backdropShowClose}
              component={Link}
              to="/user-edit"
            >
              <Typography
                sx={{
                  color: "tertiary.dark",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                Edit Profile
              </Typography>
            </Backdrop>
          </Grid>
        </Grid>
      </CardActionArea>

      <CardActions>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          color="primary"
          size="small"
          sx={{ gap: 2 }}
        >
          <Button
            endIcon={<FormatListBulletedSharpIcon />}
            component={Link}
            to="/home/tasks?status=all"
          >
            My Tasks
          </Button>
          <Button
            endIcon={<PointOfSaleSharpIcon />}
            component={Link}
            to="/home/expanses"
          >
            My Expanses
          </Button>
          <Button
            startIcon={<LogoutSharpIcon />}
            variant="contained"
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default UserProfileDashboard;
