import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Typography,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import AssignmentLateSharpIcon from "@mui/icons-material/AssignmentLateSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";

import LoadingSpinner from "../UI/LoadingSpinner.js";

import { useTaskContext } from "../../context/task-context.js";
import { useUserContext } from "../../context/user-context.js";

const TaskDashboard = ({ loading }) => {
  const { tasks, editTask, getAllTasks, deleteTask } = useTaskContext();
  const { userProfile } = useUserContext();
  const [expanded, setExpanded] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [value, setValue] = useState("");

  const handleStatusChange = ({ status, name = value, _id }) => {
    const newStatus = status === "pending" ? "done" : "pending";

    editTask({ name, status: newStatus, _id });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box mt={3} bgcolor="#eee" p={1} borderRadius={2}>
      <Typography
        variant="h3"
        fontFamily="'Kenia', cursive"
        color="secondary.dark"
      >
        Tasks
        <Button
          variant="contained"
          endIcon={<AddTaskSharpIcon />}
          component={Link}
          to="/home/tasks/create-new"
          sx={{ textTransform: "capitalize", ml: 3 }}
          size="small"
        >
          Add New Task
        </Button>
      </Typography>

      {tasks.slice(0, 5).map((task, idx) => {
        const { status, _id, name } = task;
        return (
          <Accordion
            key={_id}
            expanded={expanded === "panel" + (idx + 1)}
            onChange={handleAccordionChange("panel" + (idx + 1))}
            sx={{ bgcolor: "primary.withOpacity" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${idx + 1}bh-content`}
              id={`panel${idx + 1}bh-header`}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {onEdit ? null : (
                <Typography textTransform="capitalize">{name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "center",
                gap: 3,
              }}
            >
              {onEdit ? (
                <TextField label={name} onChange={handleChange} />
              ) : null}
              <ButtonGroup size="small" sx={{ mt: 1 }}>
                <Button
                  color={onEdit ? "secondary" : "primary"}
                  endIcon={<EditSharpIcon />}
                  onClick={
                    onEdit
                      ? () => {
                          editTask({ name: value, status, _id });
                          setOnEdit(false);
                        }
                      : () => {
                          setOnEdit(true);
                        }
                  }
                >
                  {onEdit ? "Submit" : "Edit"}
                </Button>
                <Button
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteTask(_id)}
                >
                  Delete
                </Button>
              </ButtonGroup>

              <Tooltip
                sx={{ alignSelf: "flex-end" }}
                title={
                  status === "done" ? "Mark as Active" : "Mark as Complete"
                }
              >
                <IconButton
                  onClick={(e) => handleStatusChange({ status, name, _id })}
                >
                  {status === "done" ? (
                    <TaskAltSharpIcon color="success" />
                  ) : (
                    <AssignmentLateSharpIcon
                      fontSize="small"
                      sx={{
                        color: "primary.dark",
                        "&:hover": { color: "success.main" },
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default TaskDashboard;
