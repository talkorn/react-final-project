import { CssBaseline, Grid } from "@mui/material";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const SandBoxPage = () => {
  return (
    <Fragment>
      <CssBaseline />
      <h1>SandBox page</h1>
      <Grid
        sx={{ bgcolor: "blue", display: "inline-block", p: 1, borderRadius: 1 }}
      >
        <Link
          to="/sandbox/nestedpage1"
          sx={{ color: "purple", textDecoration: "none" }}
        >
          Button 1
        </Link>
      </Grid>
      |{"  "}
      <Grid
        sx={{
          bgcolor: "green",
          display: "inline-block",
          p: 1,
          borderRadius: 1,
        }}
      >
        <Link
          to="/sandbox/nestedpage2"
          sx={{ color: "red", textDecoration: "none" }}
        >
          Button 2
        </Link>
      </Grid>
      |{"  "}
      <Grid
        sx={{
          bgcolor: "yellow",
          display: "inline-block",
          p: 1,
          borderRadius: 1,
        }}
      >
        <Link
          to="/sandbox/nestedpage3"
          sx={{ color: "red", textDecoration: "none" }}
        >
          Button 3
        </Link>
      </Grid>
      <Outlet />
    </Fragment>
  );
};

export default SandBoxPage;
