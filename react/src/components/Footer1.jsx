import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CollectionsIcon from "@mui/icons-material/Collections";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((store) => store.authSlice.payload);
  return (
    <Box sx={{ m: "auto" }}>
      <Divider />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to={ROUTES.ABOUT}
          label="About"
          icon={<InfoIcon color="Primary" />}
        />
        {isLoggedIn && (
          <BottomNavigationAction
            component={Link}
            to={ROUTES.FAVCARDS}
            label="Favorites"
            icon={<FavoriteIcon color="secondary" />}
          />
        )}
        {payload && payload.biz && (
          <BottomNavigationAction
            component={Link}
            to={ROUTES.MYCARDS}
            label="My Cards"
            icon={<CollectionsIcon />}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
