import React from "react";
import { Box, Paper, styled, Typography, Divider } from "@mui/material";

const ItemPagePaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(5),
  backgroundColor: theme.palette.primary.darkWithOpacity,
  minHeight: 620,
}));
const ItemPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  margin: "2rem auto",
}));

const ItemPageHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "baseline",
  gap: theme.spacing(3),
}));
const ItemPageHeaderTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: ".2rem",
  fontFamily: "'Zen Dots', cursive",
  fontWeight: 700,
  color: theme.palette.secondary.main,
}));

const ItemPage = ({ children, title, headerContent }) => {
  return (
    <ItemPagePaper elevation={20}>
      <ItemPageContainer>
        <ItemPageHeader>
          <ItemPageHeaderTitle variant="h2" component="h2" noWrap sx={{}}>
            {title}
          </ItemPageHeaderTitle>
          {headerContent}
        </ItemPageHeader>
        <Divider />
        {children}
      </ItemPageContainer>
    </ItemPagePaper>
  );
};

export default ItemPage;
