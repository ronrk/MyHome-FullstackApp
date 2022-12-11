import React from "react";
import { Avatar, FormGroup, styled } from "@mui/material";
import {
  Paper,
  Box,
  Container,
  Collapse,
  Typography,
  Button,
} from "@mui/material";

export const CreateNewItemPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(5),
  backgroundColor: theme.palette.primary.darkWithOpacity,
  maxWidth: 850,
  marginLeft: "auto",
  marginRight: "auto",
}));

export const CreateNewItemContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const CreateNewItemHeader = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(3),
}));

export const CreateNewItemForm = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: "100%",
}));

export const CreateNewFormGroup = styled(FormGroup)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing(5),
}));

const CreateNewItemPage = ({
  children,
  headerIcon,
  headerTitle,
  submitHandler,
}) => {
  return (
    <CreateNewItemPaper>
      <Collapse />
      <CreateNewItemContainer>
        <CreateNewItemHeader>
          <Avatar sx={{ m: 1, p: 3, bgcolor: "primary.dark" }}>
            {headerIcon}
          </Avatar>
          <Typography component="h1" variant="h3">
            {headerTitle}
          </Typography>
        </CreateNewItemHeader>
        <CreateNewItemForm component="form" noValidate onSubmit={submitHandler}>
          <CreateNewFormGroup>{children}</CreateNewFormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CREATE
          </Button>
        </CreateNewItemForm>
      </CreateNewItemContainer>
    </CreateNewItemPaper>
  );
};

export default CreateNewItemPage;
