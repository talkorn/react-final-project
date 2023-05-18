import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SingleCardPageComponent from "../components/SingleCardPageComponent1";
import ROUTES from "../routes/ROUTES";
import validateIdCardParamsSchema from "../validation/idValidation";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
import CssBaseline from "@mui/material/CssBaseline";
import { toast } from "react-toastify";

const CardPage = () => {
  const payload = useSelector((store) => store.authSlice.payload);
  const LoggedIn = useLoggedIn();
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(null);

  useEffect(() => {
    LoggedIn();

    if (inputState) {
    }
    (async () => {
      try {
        if (!id) {
          return;
        }
        const errors = validateIdCardParamsSchema({ id });
        if (errors) {
          // there was errors = incorrect id
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);

        if (!data) {
          return;
        }
        const newInputState = {
          ...data,
          url: data?.image?.url || "",
          alt: data?.image?.alt || "",
          bizNumber: data?.bizNumber || "",
        };
        delete newInputState.image;
        setInputState(newInputState);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
  let idUser;
  if (payload) {
    idUser = payload._id;
  }
  const moveToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };
  const addToFavorite = async (id) => {
    await axios.patch(`/cards/card-like/${id}`);

    try {
      const { data } = await axios.get("/cards/card/" + id);

      if (!data) {
        return;
      }
      const newInputState = {
        ...data,
        url: data?.image?.url || "",
        alt: data?.image?.alt || "",
        bizNumber: data?.bizNumber || "",
      };
      delete newInputState.image;
      setInputState(newInputState);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };
  const deleteCardFromInitialCardsArr = async () => {
    try {
      await axios.delete("cards/" + id);
      navigate(ROUTES.HOME);
      toast.success("you have deleted the card");
    } catch (err) {
      toast.error("The card didn't delete");
      console.log("error from axios", err.response.data);
    }
  };
  const cancleButoon = () => {
    navigate(ROUTES.HOME);
  };

  if (!inputState) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <CssBaseline />
      <Grid sx={{ textAlign: "center" }}>
        <h1>Card Page</h1>
        <h2> {inputState.title}</h2>
      </Grid>

      <Button
        sx={{ m: 1, color: "black" }}
        onClick={cancleButoon}
        size="large"
        color="error"
      >
        <CancelIcon />
      </Button>
      <Grid container spacing={2}>
        <SingleCardPageComponent
          onFavorites={addToFavorite}
          likes={inputState.likes}
          idUser={idUser}
          ids={inputState._id}
          title={inputState.title}
          subTitle={inputState.subTitle}
          description={inputState.description}
          phone={inputState.phone}
          img={inputState.url}
          web={inputState.web}
          state={inputState.state}
          country={inputState.country}
          city={inputState.city}
          street={inputState.street}
          email={inputState.email}
          houseNumber={inputState.houseNumber}
          zipCode={inputState.zipCode}
          bizNumber={inputState.bizNumber}
          createdAt={inputState.createdAt}
          onEdit={moveToEditPage}
          onDelete={deleteCardFromInitialCardsArr}
          canEdit={payload && (payload.biz || payload.isAdmin)}
          canDelete={payload && payload.isAdmin}
          canUser={payload && payload._id}
          cardIdUser={inputState.user_id}
        />
      </Grid>
    </Box>
  );
};
export default CardPage;
