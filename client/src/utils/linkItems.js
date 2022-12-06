import DashboardIcon from "@mui/icons-material/Dashboard";

import AddTaskSharpIcon from "@mui/icons-material/AddTaskSharp";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import AssignmentReturnedSharpIcon from "@mui/icons-material/AssignmentReturnedSharp";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import AssignmentLateSharpIcon from "@mui/icons-material/AssignmentLateSharp";

import PointOfSaleSharpIcon from "@mui/icons-material/PointOfSaleSharp";
import RequestQuoteSharpIcon from "@mui/icons-material/RequestQuoteSharp";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";

import HomeWorkSharpIcon from "@mui/icons-material/HomeWorkSharp";

import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import PermContactCalendarSharpIcon from "@mui/icons-material/PermContactCalendarSharp";

export const mainListItems = [
  { label: "Home", path: "/", icon: <DashboardIcon /> },
  {
    label: "Tasks",
    icon: <FormatListBulletedSharpIcon />,
    sublinks: [
      {
        label: "All Tasks",
        path: "/tasks?status=all",
        icon: <AssignmentReturnedSharpIcon />,
      },
      {
        label: "create new task",
        path: "/tasks/create-new",
        icon: <AddTaskSharpIcon />,
      },
      {
        label: "All completed",
        path: "/tasks?status=done",
        icon: <TaskAltSharpIcon />,
      },
      {
        label: "All active",
        path: "/tasks?status=pending",
        icon: <AssignmentLateSharpIcon />,
      },
    ],
  },
  {
    label: "Expanses",
    icon: <PointOfSaleSharpIcon />,
    sublinks: [
      {
        label: "All Expanses",
        path: "/expanses",
        icon: <RequestQuoteSharpIcon />,
      },
      {
        label: "create new expanse",
        path: "/expanses/create-new",
        icon: <AddShoppingCartSharpIcon />,
      },
    ],
  },
  {
    label: "MyHouses",
    icon: <HomeWorkSharpIcon />,
    sublinks: [
      { label: "My Houses", path: "/myhouses", icon: <HomeWorkSharpIcon /> },
      //   { label: "create new expanse", path: "/expanses/create-new" },
    ],
  },
  {
    label: "Profile",
    icon: <AccountCircleSharpIcon />,
    sublinks: [
      {
        label: "profile",
        path: "/user",
        icon: <PermContactCalendarSharpIcon />,
      },
    ],
  },
];
