import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ThumbUpAltSharpIcon from "@mui/icons-material/ThumbUpAltSharp";

import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import AssignmentLateSharpIcon from "@mui/icons-material/AssignmentLateSharp";

import { useTaskContext } from "../../context/task-context";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.darkWithOpacity,
  padding: 5,
}));

const TaskCard = ({ name, status, _id, query }) => {
  const { editTask, deleteTask } = useTaskContext();
  const [onNameEdit, setOnNameEdit] = useState(false);
  const [value, setValue] = useState("");

  const handleStatusChange = () => {
    const newStatus = status === "pending" ? "done" : "pending";
    editTask({ name, status: newStatus, _id }, query);
  };
  const handleNameChange = (e) => {
    let newName = value;
    if (!value || value === "") {
      newName = name;
    }
    editTask({ name: newName, status, _id }, query);
    setOnNameEdit(false);
  };
  return (
    <Demo sx={{ opacity: status === "done" ? 0.6 : 1 }}>
      <List>
        <ListItem
          secondaryAction={
            <Tooltip
              title={
                status === "done"
                  ? "Delete Completed task"
                  : "Delete Active task"
              }
            >
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTask(_id, query)}
              >
                <DeleteIcon
                  color="primary"
                  sx={{ "&:hover": { color: "error.main" } }}
                />
              </IconButton>
            </Tooltip>
          }
        >
          <Tooltip
            title={status === "done" ? "Mark as Active" : "Mark as Complete"}
          >
            <IconButton onClick={handleStatusChange}>
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
          <Tooltip
            title={
              onNameEdit ? "Confirm Change" : "Edit Name(remark as active)"
            }
          >
            <IconButton
              onClick={() =>
                onNameEdit ? handleNameChange() : setOnNameEdit(true)
              }
            >
              {onNameEdit ? (
                <ThumbUpAltSharpIcon
                  sx={{
                    "&:hover": {
                      color: "success.main",
                    },
                  }}
                  color="darkBlue"
                />
              ) : (
                <EditSharpIcon
                  color="primary"
                  sx={{ "&:hover": { color: "darkBlue.light" } }}
                />
              )}
            </IconButton>
          </Tooltip>
          {onNameEdit ? (
            <TextField
              id="standard-basic"
              color="darkBlue"
              sx={{ textTransform: "capitalize" }}
              label={name}
              variant="standard"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={(e) => {
                if (onNameEdit) {
                  if (e.key === "Enter") {
                    handleNameChange();
                  }
                }
              }}
            />
          ) : (
            <ListItemText
              primary={name}
              sx={[
                {
                  "& .MuiListItemText-primary": {
                    color: "secondary.common",
                    textTransform: "capitalize",
                    fontFamily: "'Zen Dots', cursive",
                    fontSize: "1.3rem",
                    letterSpacing: "-1px",
                  },
                },
                status === "done" && {
                  "& .MuiListItemText-primary": {
                    textDecoration: "line-through 2.5px #081812",
                    color: "primary.main",
                  },
                },
              ]}
            />
          )}
        </ListItem>
      </List>
    </Demo>
  );
};

export default TaskCard;
