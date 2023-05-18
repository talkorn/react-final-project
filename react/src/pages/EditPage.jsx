import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateIdCardParamsSchema from "../validation/idValidation";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import validateEditSchema from "../validation/editValidation";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
const CardPage = () => {
  const { id } = useParams();
  const [inputsErrorsState, setInputsErrorsState] = useState("");
  const [buttonValid, setButtonValid] = useState(false);
  const [inputState, setInputState] = useState("");
  const [initialnputState, setInitialnputState] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        if (!id) {
          return;
        }
        const errors = validateIdCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        if (data.image && !data.zipCode) {
          newInputState.zipCode = "";
        }
        if (data.bizNumber && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.__v;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        setInputState(newInputState);
        setInitialnputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
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
      inputState.houseNumber
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
      await axios.put("/cards/" + id, inputState);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("error from axios", err.response);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const resetButton = () => {
    setInputState(initialnputState);
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
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Page
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.url}
          title={inputState.title}
        />
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
