import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ROUTES from "../routes/ROUTES";
import { Fragment } from "react";

const ShortTYpographyComponnent = () => {
  return (
    <Fragment>
      <Typography
        variant="h6"
        /*  noWrap */
        component={Link}
        to={ROUTES.HOME}
        sx={{
          mr: 1,
          fontFamily: "monospace",
          fontWeight: 300,
          letterSpacing: ".1rem",
          color: "inherit",
          textDecoration: "none",
          "&:hover": {
            color: "blue",
          },
        }}
      >
        Tal's Cards
      </Typography>
    </Fragment>
  );
};
export default ShortTYpographyComponnent;
