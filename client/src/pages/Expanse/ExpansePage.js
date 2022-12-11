import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  BootstrapInput,
  MenuItem,
  Divider,
} from "@mui/material";

import { useExpanseContext } from "../../context/expanse-context";
import { useAuthContext } from "../../context/auth-context";

import ItemPage from "../../components/UI/ItemPage";

import {
  ExpansePageActions,
  ExpansePageContent,
  ExpanseHeaderContent,
} from "../../components";

const ExpansePage = () => {
  const {
    getAllExpanses,
    getCurrentYearExpenses,
    expanses,
    loading,
    lastMonthsExpanses,
    lastYearExpanses,
  } = useExpanseContext();
  const { user } = useAuthContext();
  console.log(expanses, lastMonthsExpanses, lastYearExpanses);

  useEffect(() => {
    if (user) {
      getCurrentYearExpenses(user.token);
      getAllExpanses(user.token);
    }
  }, []);

  return (
    <ItemPage title="Your Expanses" headerContent={<ExpanseHeaderContent />}>
      <ExpansePageActions
        lastYearExpanses={lastYearExpanses}
        loading={loading}
      />
      <Divider />
      <ExpansePageContent
        expanses={expanses}
        loading={loading}
        lastMonthsExpanses={lastMonthsExpanses}
      />
    </ItemPage>
  );
};

export default ExpansePage;
