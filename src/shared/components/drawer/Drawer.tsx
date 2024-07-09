import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts";
import { DarkTheme } from "../../themes";
import MetricsCutLogo from "../../../assets/Metricscut.png"; // Importe a imagem

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

const screenWidth = window.innerWidth;

let drawerWidth = 150;
let listItemIcon = 30;

if (screenWidth < 800) {
  drawerWidth = 55;
  listItemIcon = 130;
}

export const ClippedDrawer: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: DarkTheme.palette.primary.dark,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={MetricsCutLogo}
              alt="Metrics Cut Logo"
              style={{ height: 20, marginRight: 5 }}
            />
            <Typography variant="h6" noWrap component="div"></Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Configurações</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding onClick={() => navigate("/")}>
              <ListItemButton sx={{ overflow: "hidden" }}>
                <ListItemIcon sx={{ minWidth: listItemIcon }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Painel Adm"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate("/dashboard")}>
              <ListItemButton sx={{ overflow: "hidden" }}>
                <ListItemIcon sx={{ minWidth: listItemIcon }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"ADM"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate("/competition")}>
              <ListItemButton sx={{ overflow: "hidden" }}>
                <ListItemIcon sx={{ minWidth: listItemIcon }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="21.000000pt"
                    height="18.000000pt"
                    viewBox="0 0 21.000000 18.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,18.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path d="M177 173 c-11 -10 -8 -101 3 -108 6 -4 10 17 10 54 0 62 -1 66 -13 54z" />
                      <path d="M93 124 c-3 -8 -1 -20 6 -27 8 -8 11 -4 11 16 0 30 -7 35 -17 11z" />
                      <path d="M57 123 c-11 -10 -8 -61 3 -68 6 -4 10 10 10 34 0 42 -2 46 -13 34z" />
                      <path d="M134 109 c-3 -6 -1 -16 5 -22 8 -8 11 -5 11 11 0 24 -5 28 -16 11z" />
                      <path d="M14 79 c-3 -6 -1 -16 5 -22 8 -8 11 -5 11 11 0 24 -5 28 -16 11z" />
                      <path d="M10 10 c0 -6 38 -10 95 -10 57 0 95 4 95 10 0 6 -38 10 -95 10 -57 0 -95 -4 -95 -10z" />
                    </g>
                  </svg>{" "}
                </ListItemIcon>
                <ListItemText primary={"Competição"} />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => navigate("/dashboard-clipper")}
            >
              <ListItemButton sx={{ overflow: "hidden" }}>
                <ListItemIcon sx={{ minWidth: listItemIcon }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Clipador"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ width: "100%", minHeight: "100vh", padding: "10px" }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
