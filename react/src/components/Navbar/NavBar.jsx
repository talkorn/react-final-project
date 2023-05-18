import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchFromNav from "../SearchNavComponent1";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShortTYpographyComponnent from "../ShortTYpographyComponnent";
import CheckboxComponnent from "../CheckboxComponnent";
const notAuthPages = [
  { label: "SignUp", url: ROUTES.SIGNUP },
  { label: "Login", url: ROUTES.LOGIN },
];
const authedPages = [
  { label: "Profile", url: ROUTES.PROFILE },
  { label: "Logout", url: ROUTES.LOGOUT },
];
function ResponsiveAppBar() {
  const payload = useSelector((store) => store.authSlice.payload);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    toast.success("You've been signed out");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <CheckboxComponnent /> <ShortTYpographyComponnent />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLinkComponent
                key={ROUTES.ABOUT}
                url={ROUTES.ABOUT}
                label="About"
                onClick={handleCloseNavMenu}
              />
              {isLoggedIn && (
                <NavLinkComponent
                  key={ROUTES.FAVCARDS}
                  url={ROUTES.FAVCARDS}
                  label="Favorite"
                  onClick={handleCloseNavMenu}
                />
              )}
              {payload && (payload.isAdmin || payload.biz) && (
                <NavLinkComponent
                  key={ROUTES.SANDBOX}
                  url={ROUTES.SANDBOX}
                  label="Sandbox"
                  onClick={handleCloseNavMenu}
                />
              )}
              {payload && payload.biz && (
                <NavLinkComponent
                  key={ROUTES.MYCARDS}
                  url={ROUTES.MYCARDS}
                  label="MY Cards"
                  onClick={handleCloseNavMenu}
                />
              )}
              {payload && payload.isAdmin && (
                <NavLinkComponent
                  key={ROUTES.CRM}
                  url={ROUTES.CRM}
                  label="CRM"
                  onClick={handleCloseNavMenu}
                />
              )}
              {isLoggedIn
                ? authedPages.map((settings) =>
                    settings.url === ROUTES.LOGOUT ? (
                      <MenuItem key={settings.url}>
                        <Link to={settings.url} onClick={logoutClick}>
                          <Typography
                            sx={{ textDecoration: "none", color: "pink" }}
                          >
                            {settings.label}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ) : (
                      <MenuItem key={settings.url}>
                        <Link to={settings.url} onClick={handleCloseNavMenu}>
                          <Typography
                            sx={{ textDecoration: "none", color: "pink" }}
                          >
                            {settings.label}
                          </Typography>
                        </Link>
                      </MenuItem>
                    )
                  )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLinkComponent url={ROUTES.ABOUT} label="About" />
            {isLoggedIn && (
              <NavLinkComponent url={ROUTES.FAVCARDS} label="Favorite" />
            )}
            {payload && (payload.isAdmin || payload.biz) && (
              <NavLinkComponent url={ROUTES.SANDBOX} label="Sandbox" />
            )}
            {payload && payload.biz && (
              <NavLinkComponent url={ROUTES.MYCARDS} label="MY Cards" />
            )}
            {payload && payload.isAdmin && (
              <NavLinkComponent key={ROUTES.CRM} url={ROUTES.CRM} label="CRM" />
            )}
          </Box>
          <SearchFromNav />
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isLoggedIn
                ? authedPages.map((page) =>
                    page.url === ROUTES.LOGOUT ? (
                      <NavLinkComponent
                        key={page.url}
                        {...page}
                        to={page.url}
                        onClick={logoutClick}
                      />
                    ) : (
                      <NavLinkComponent key={page.url} {...page} />
                    )
                  )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))}
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://img.freepik.com/premium-vector/blue-green-circle-with-person-icon-it_816425-2573.jpg?w=826"
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>{" "}
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
