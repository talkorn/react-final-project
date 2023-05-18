/* 
    , */

import { useState, useEffect, Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routes/ROUTES";

import { CircularProgress } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import validateEditSchema from "../validation/editValidation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardPage = () => {
  /*  const { id } = useParams(); */
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [buttonValid, setButtonValid] = useState(false);
  const initialCard = {
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png",

    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
  };
  const [inputState, setInputState] = useState(initialCard);

  const navigate = useNavigate();

  useEffect(() => {
    const joiResponse = validateEditSchema(inputState);
    setInputsErrorsState(joiResponse);
    if (
      inputState &&
      !joiResponse &&
      inputState.title &&
      inputState.subTitle &&
      inputState.phone &&
      inputState.country &&
      inputState.email &&
      inputState.web &&
      inputState.city &&
      inputState.street &&
      inputState.houseNumber &&
      inputState.description
    ) {
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
      await axios.post("/cards/", inputState);
      toast.success("Great! a new Business Card has been created");

      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.log("error from axios", err.response.data);
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const resetButton = () => {
    setInputState(initialCard);
    setButtonValid(false);
  };

  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };
  if (!inputState) {
    return <CircularProgress />;
  }
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
          <AddCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Card
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.url}
          title={inputState.title}
        />{" "}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "title", required: true },
              { description: "subTitle", required: true },
              { description: "description", required: true },
              { description: "phone", required: true },
              { description: "email", required: true },
              { description: "web", required: true },
              { description: "url", required: false },
              { description: "alt", required: false },
              { description: "state", required: false },
              { description: "country", required: true },
              { description: "city", required: true },
              { description: "street", required: true },
              { description: "houseNumber", required: true },
              { description: "zipCode", required: false },
            ].map((props, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <UserComponent
                  description={props.description}
                  inputStates={inputState}
                  onChanges={handleInputChange}
                  inputsErrorsStates={inputsErrorsState}
                  required={props.required}
                />
              </Grid>
            ))}
            <Stack xs={12} sx={{ m: 2 }} spacing={2} direction="row">
              <Button
                onClick={cancleButoon}
                fullWidth
                variant="outlined"
                color="error"
              >
                Cancle
              </Button>
              <Button
                onClick={() => resetButton()}
                fullWidth
                variant="outlined"
                color="success"
              >
                <RestartAltIcon />
              </Button>
            </Stack>

            <Button
              onClick={handleSubmit}
              type="submit"
              disabled={!buttonValid}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CardPage;
