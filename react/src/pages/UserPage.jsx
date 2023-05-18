import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UserComponent from "../components/UserComponent";
import CardMedia from "@mui/material/CardMedia";

const UserPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState("");
  useEffect(() => {
    (async () => {
      try {
        let newInputState;
        const { data } = await axios.get("users/getAllUsers");
        if (data) {
          let userInfo = data.users;
          userInfo = userInfo.find((item) => item._id === id);
          newInputState = {
            ...userInfo,
          };
        }
        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);

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
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Page
        </Typography>
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={inputState.imageUrl}
          title={inputState.title}
        />{" "}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { description: "firstName", required: true },
              { description: "middleName", required: false },
              { description: "lastName", required: true },
              { description: "phone", required: true },
              { description: "email", required: true },
              { description: "imageUrl", required: false },
              { description: "imageAlt", required: false },
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
                  required={props.required}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default UserPage;
