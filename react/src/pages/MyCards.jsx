import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/CardComponents";
import ROUTES from "../routes/ROUTES";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
import { toast } from "react-toastify";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import useQueryParams from "../hooks/useQueryParam.js";
import filterFunction from "../utilis/filterFunc.js";
const MyCardsPage = () => {
  const searchParams = useQueryParams();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const LoggedIn = useLoggedIn();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    LoggedIn();

    axios
      .get("cards/my-cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {});
  }, []);
  const filterFunc = (data) => {
    let dataToSearch = originalCardsArr || data;
    if (!dataToSearch) {
      return;
    }
    let searchResult = filterFunction(dataToSearch, searchParams);

    setOriginalCardsArr(dataToSearch);
    setCardsArr(searchResult);
  };
  useEffect(() => {
    filterFunc();
  }, [searchParams.filter]);
  let idUser;
  if (payload) {
    idUser = payload._id;
    // rest of the code here
  }

  if (!cardsArr) {
    return <CircularProgress />;
  }

  const moveToCardPage = (id) => {
    navigate(`/card/${id}`);
  };
  const moveToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };

  const addToFavorite = async (id) => {
    await axios.patch(`/cards/card-like/${id}`);
    try {
      const { data } = await axios.get("/cards/my-cards");
      setCardsArr(data);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };

  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      setCardsArr((cardsArr) => cardsArr.filter((item) => item._id != id));
      await axios.delete("cards/" + id);
      toast.success("you have deleted the card");
    } catch (err) {
      toast.error("The card didn't delete");
      console.log("error when deleting", err.response.data);
    }
  };

  const moveToAddCards = () => {
    navigate(ROUTES.ADDCARD);
  };
  return (
    <Box>
      <CssBaseline />
      <h1>Cards Page</h1>
      <h2>Here You Can Find All your Buisness Cards</h2>
      <Grid item xs={4}>
        <Box
          sx={{
            flexGrow: 1,
            position: "fixed",
            bottom: 0,
            left: 25,
            m: 2,
          }}
        >
          <Button
            onClick={moveToAddCards}
            sx={{
              display: "block",
            }}
          >
            <AddCircleIcon
              color="primary"
              fontSize="large"
              sx={{ fontSize: 80 }}
            />
          </Button>
        </Box>
        <Grid container spacing={2}>
          {cardsArr.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id + Date.now()}>
              <CardComponent
                likes={item.likes}
                idUser={idUser}
                onClick={moveToCardPage}
                id={item._id}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                phone={item.phone}
                img={item.image.url}
                web={item.web}
                state={item.state}
                country={item.country}
                city={item.city}
                street={item.street}
                email={item.email}
                houseNumber={item.houseNumber}
                zipCode={item.zipCode}
                bizNumber={item.bizNumber}
                onEdit={moveToEditPage}
                onDelete={deleteCardFromInitialCardsArr}
                onFavorites={addToFavorite}
                canEdit={payload && (payload.biz || payload.isAdmin)}
                canDelete={payload && payload.isAdmin}
                canUser={payload && payload._id}
                cardIdUser={item.user_id}
              />
            </Grid>
          ))}{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyCardsPage;
