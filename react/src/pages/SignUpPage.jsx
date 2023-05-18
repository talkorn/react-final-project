import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Stack from "@mui/material/Stack";
import validateSignUpSchema from "../validation/signUpValidaton";
import axios from "axios";
import UserComponent from "../components/UserComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardMedia from "@mui/material/CardMedia";
const SignUpPage = () => {
  const resaetInputState = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    /*    biz: "", */
  };
  const [inputState, setInputState] = useState(resaetInputState);
  const navigate = useNavigate();
  const [buttonValid, setButtonValid] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState(null);

  useEffect(() => {
    const joiResponse = validateSignUpSchema(inputState);
    setInputsErrorsState(joiResponse);
    if (
      !joiResponse &&
      inputState.firstName &&
      inputState.lastName &&
      inputState.phone &&
      inputState.country &&
      inputState.email &&
      inputState.password &&
      inputState.city &&
      inputState.street &&
      inputState.houseNumber /* &&
      inputState.zipCode */
    ) {
      setButtonValid(true);
    } else {
      setButtonValid(false);
    }
  }, [inputState]);
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
  const resetButton = () => {
    setInputState(resaetInputState);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputsErrorsState) {
        return;
      }
      if (!inputState.zipCode) {
        delete inputState.zipCode;
      }
      await axios.post("users/register", inputState);
      toast.success("Registration Completed");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("error from axios", err.response);
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const [agreement, setAgreement] = useState(false);
  const handleChangecheck = (event) => {
    setAgreement(event.target.checked);
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
          Sign up
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.imageUrl}
          title={inputState.title}
        />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "firstName", required: true },
              { description: "middleName", required: false },
              { description: "lastName", required: true },
              { description: "phone", required: true },
              { description: "email", required: true },
              { description: "password", required: true },
              { description: "imageUrl", required: false },
              { description: "imageAlt", required: false },
              { description: "state", required: false },
              { description: "country", required: true },
              { description: "city", required: true },
              { description: "street", required: true },
              { description: "houseNumber", required: true },
              { description: "zipCode", required: false },
            ].map((props) => (
              <Grid item xs={12} sm={6} key={props.description}>
                <UserComponent
                  description={props.description}
                  inputStates={inputState}
                  onChanges={handleInputChange}
                  inputsErrorsStates={inputsErrorsState}
                  required={props.required}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="buisness"
                    onChange={handleChangecheck}
                    color="primary"
                  />
                }
                label="SignUp as buisness"
              />
            </Grid>
          </Grid>
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
            type="submit"
            disabled={!buttonValid}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default SignUpPage;
