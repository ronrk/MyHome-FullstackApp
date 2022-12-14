import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { Divider } from "@mui/material";

import { useExpanseContext } from "../../context/expanse-context";

import ItemPage from "../../components/UI/ItemPage";

import {
  ExpansePageActions,
  ExpansePageContent,
  ExpanseHeaderContent,
} from "../../components";

const ExpansePage = () => {
  const {
    expanses,
    expansesLoading,
    lastMonthsExpanses,
    lastYearExpanses,
    getAllExpanses,
  } = useExpanseContext();

  useEffect(() => {
    console.log("EXPANSE PAGE");
    getAllExpanses();
  }, []);

  return (
    <ItemPage title="Your Expanses" headerContent={<ExpanseHeaderContent />}>
      <ExpansePageActions
        lastYearExpanses={lastYearExpanses}
        loading={expansesLoading}
      />
      <Divider />
      <ExpansePageContent
        expanses={expanses}
        loading={expansesLoading}
        lastMonthsExpanses={lastMonthsExpanses}
      />
    </ItemPage>
  );
};

export default ExpansePage;
