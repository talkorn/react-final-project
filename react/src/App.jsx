import "./App.css";
import {
  CircularProgress,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

import ResponsiveAppBar from "../src/components/Navbar/NavBar";
import { useEffect, useState } from "react";
import Router from "../src/routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";
import SimpleBottomNavigation from "./components/Footer1";
const light = {
  palette: {
    mode: "light",
    background: { default: "lightBlue", paper: "#fff" },
  },
};

const dark = {
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);
  const isDarkMode = useSelector((store) => store.darkModeSlice.isDarkMode);
  return (
    <ThemeProvider theme={isDarkMode ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header>
          <ResponsiveAppBar />
        </header>
        <main>{isLoading ? <CircularProgress /> : <Router />}</main>
        <footer>
          <SimpleBottomNavigation />
        </footer>
      </Container>
    </ThemeProvider>
  );
}
export default App;
