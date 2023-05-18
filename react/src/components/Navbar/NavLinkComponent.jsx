import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
const NavLinkComponent = ({ url, label, onClick }) => {
  return (
    <NavLink to={url} onClick={onClick}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          color={isActive ? "lightBlue" : "pink"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};
NavLinkComponent.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default NavLinkComponent;
