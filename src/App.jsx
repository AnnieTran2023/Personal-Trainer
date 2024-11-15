import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Face2Icon from "@mui/icons-material/Face2";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MenuIcon from "@mui/icons-material/Menu";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Statistics from "./components/Statistics";

const drawerWidth = 240; // Width of the drawer

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <List>
      {[
        { text: "Customer", icon: <Face2Icon />, path: "/customer" },
        { text: "Training", icon: <SportsGymnasticsIcon />, path: "/training" },
        { text: "Statistics", icon: <LeaderboardIcon />, path: "/statistics" },
      ].map(({ text, icon, path }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#f08080",
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            ml: open ? `${drawerWidth}px` : 0,
            transition: "margin 0.3s ease-in-out",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ overflow: "auto" }}>{DrawerList}</Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            transition: "margin 0.3s ease-in-out",
            ml: open ? `${drawerWidth}px` : 0,
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/customer" element={<Customers />} />
            <Route path="/training" element={<Trainings />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
