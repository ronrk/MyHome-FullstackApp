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
  {
    label: "Home",
    path: "/home",
    icon: <DashboardIcon color="inherit" />,
  },
  {
    label: "Tasks",
    icon: <FormatListBulletedSharpIcon />,
    sublinks: [
      {
        label: "create new task",
        path: "/home/tasks/create-new",
        icon: <AddTaskSharpIcon />,
      },
      {
        label: "All Tasks",
        path: "/home/tasks?status=all",
        icon: <AssignmentReturnedSharpIcon />,
      },
      {
        label: "All completed",
        path: "/home/tasks?status=done",
        icon: <TaskAltSharpIcon />,
      },
      {
        label: "All active",
        path: "/home/tasks?status=pending",
        icon: <AssignmentLateSharpIcon />,
      },
    ],
  },
  {
    label: "Expanses",
    icon: <PointOfSaleSharpIcon />,
    sublinks: [
      {
        label: "create new expanse",
        path: "/home/expanses/create-new",
        icon: <AddShoppingCartSharpIcon />,
      },
      {
        label: "All Expanses",
        path: "/home/expanses",
        icon: <RequestQuoteSharpIcon />,
      },
    ],
  },
  {
    label: "MyHouses",
    icon: <HomeWorkSharpIcon />,
    sublinks: [
      {
        label: "My Houses",
        path: "/home/myhouses",
        icon: <HomeWorkSharpIcon />,
      },
      //   { label: "create new expanse", path: "/expanses/create-new" },
    ],
  },
  {
    label: "Profile",
    icon: <AccountCircleSharpIcon />,
    sublinks: [
      {
        label: "profile",
        path: "/home/user",
        icon: <PermContactCalendarSharpIcon />,
      },
    ],
  },
];
