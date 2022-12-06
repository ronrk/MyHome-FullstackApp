import React, { useState } from "react";

import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  styled,
  TextField,
} from "@mui/material";

import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";

import RectangleSharpIcon from "@mui/icons-material/RectangleSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import ThumbUpAltSharpIcon from "@mui/icons-material/ThumbUpAltSharp";

import { useAuthContext } from "../../context/auth-context";
import { useTaskContext } from "../../context/task-context";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.darkWithOpacity,
  padding: 5,
}));

const TaskCard = ({ name, status, _id }) => {
  const { user } = useAuthContext();
  const { editTask, deleteTask } = useTaskContext();
  const [onNameEdit, setOnNameEdit] = useState(false);
  const [value, setValue] = useState("");
  const handleStatusChange = () => {
    editTask({ name, status, _id }, user.token);
  };
  const handleNameChange = (e) => {
    let newName = value;
    if (!value || value === "") {
      newName = name;
    }
    editTask({ name: newName, status, _id }, user.token);
    setOnNameEdit(false);
  };
  return (
    <Demo>
      <List>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTask(_id, user.token)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          }
        >
          <IconButton onClick={handleStatusChange}>
            {status === "done" ? (
              <DoneOutlineSharpIcon color="success" />
            ) : (
              <RectangleSharpIcon
                fontSize="small"
                sx={{ color: "secondary.common" }}
              />
            )}
          </IconButton>
          <IconButton
            onClick={() =>
              onNameEdit ? handleNameChange() : setOnNameEdit(true)
            }
          >
            {onNameEdit ? (
              <ThumbUpAltSharpIcon color="success" />
            ) : (
              <EditSharpIcon color="tertiary" />
            )}
          </IconButton>
          {onNameEdit ? (
            <TextField
              id="standard-basic"
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
                  },
                },
                status === "done" && {
                  "& .MuiListItemText-primary": {
                    textDecoration: "line-through 1px green",
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
