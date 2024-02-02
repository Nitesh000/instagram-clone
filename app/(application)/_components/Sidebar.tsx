import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { ProfileOutlineIcon } from "./ProfileIcons";

const sidebarList = [
  {
    label: "Home",
    icon: <HomeOutlinedIcon />,
  },
  {
    label: "Search",
    icon: <SearchOutlinedIcon />,
  },
  {
    label: "Explore",
    icon: <ExploreOutlinedIcon />,
  },
  {
    label: "Reels",
    icon: <MovieOutlinedIcon />,
  },
  {
    label: "Messages",
    icon: <ForumOutlinedIcon />,
  },
  {
    label: "Notifications",
    icon: <FavoriteBorderOutlinedIcon />,
  },
  {
    label: "Create",
    icon: <AddBoxOutlinedIcon />,
  },
  {
    label: "Profile",
    icon: <ProfileOutlineIcon profileUrl="/noPic.png" />,
  },
];

const drawerWidth = 240;

export default function Sidebar({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          {/* <Typography variant="h6" noWrap component="div"> */}
          {/*   Permanent drawer */}
          {/* </Typography> */}
          {/* NOTE: Status */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            marginTop: "3rem",
          }}
        >
          <Image
            src="/Instagram.png"
            alt="instagram image"
            width={400}
            height={400}
          />
        </Toolbar>
        <List>
          {sidebarList.map((sideItem, index) => (
            <ListItem key={sideItem.label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{sideItem.icon}</ListItemIcon>
                <ListItemText primary={sideItem.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
