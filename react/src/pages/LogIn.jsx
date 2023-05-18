import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import logInValidationSchema from "../validation/logInValidation";
import axios from "axios";
import useLoggedIn from "../hooks/useLoggedIn";
import { Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const LogIn = () => {
  const loggedIn = useLoggedIn();
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({ email: "", password: "" });
  const [buttonValid, setButtonValid] = useState(false);
  useEffect(() => {
    const joiResponse = logInValidationSchema(inputState);
    setInputsErrorsState(joiResponse);
    if (!joiResponse && inputState.email && inputState.password) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [inputState]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      toast.success("SignIn Completed");
      loggedIn();
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("login error", err);
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
  const resetButton = () => {
    setInputState({ email: "", password: "" });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputState.email}
            onChange={handleInputChange}
          />
          {inputsErrorsState && inputState.email && inputsErrorsState.email && (
            <Alert severity="warning">
              {inputsErrorsState.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputState.password}
            onChange={handleInputChange}
          />
          {inputsErrorsState &&
            inputState.password &&
            inputsErrorsState.password && (
              <Alert severity="warning">
                <div>
                  password should contain at least one uppercase and one
                  lowercase letter. length should be between 6 and 10.
                </div>
              </Alert>
            )}
          <Stack xs={12} spacing={3} direction="row">
            <Button
              onClick={cancleButoon}
              fullWidth
              variant="outlined"
              color="error"
            >
              Cancle
            </Button>
            <Button
              onClick={resetButton}
              fullWidth
              variant="outlined"
              color="success"
            >
              <RestartAltIcon />
            </Button>
          </Stack>
          <Button
            disabled={!buttonValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default LogIn;
