import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button, Grid } from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

const ExpanseCardContainer = ({ expanses }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {expanses.map((expanse, idx) => {
        const { _id, name, value, bills, createdAt } = expanse;
        const dateCreated = new Date(
          Date.parse(createdAt)
        ).toLocaleDateString();
        return (
          <Accordion
            key={_id}
            expanded={expanded === "panel" + (idx + 1)}
            onChange={handleChange("panel" + (idx + 1))}
            sx={{ bgcolor: "primary.withOpacity" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx + 1}bh-content`}
              id={`panel${idx + 1}bh-header`}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                sx={{
                  width: "60%",
                  flexShrink: 0,
                  flexGrow: 1,
                  fontSize: 18,
                  color: "primary.common",
                }}
              >
                {name}
              </Typography>
              <Typography sx={{ color: "darkBlue.dark", fontSize: 25 }}>
                {value}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item>
                  <Typography sx={{ color: "primary.common" }}>
                    bills:{bills ? bills : 1}
                  </Typography>
                  <Typography sx={{ color: "primary.common" }}>
                    {" "}
                    created:{dateCreated}
                  </Typography>
                </Grid>
                <Grid ml="auto">
                  <Button color="error" endIcon={<DeleteSharpIcon />}>
                    delete
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ExpanseCardContainer;

/* 





 */
