import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLoggedIn from "../hooks/useLoggedIn";
import CssBaseline from "@mui/material/CssBaseline";
import useQueryParams from "../hooks/useQueryParam.js";
import filterFunction from "../utilis/filterFunc.js";
const FavoritePage = () => {
  const searchParams = useQueryParams();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const LoggedIn = useLoggedIn();
  const navigate = useNavigate();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    LoggedIn();

    axios
      .get("http://localhost:8181/api/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })

      .catch((err) => {
        console.log("err from axios", err);
      });
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
  if (!payload) {
    return;
  }
  const idUser = payload._id;
  if (!idUser) {
    return;
  }
  if (!cardsArr) {
    return <CircularProgress />;
  }

  const moveToCardPage = (id) => {
    console.log("id", id);
    navigate(`/card/${id}`);
  };
  const moveToEditPage = (id) => {
    navigate(`/edit/${id}`);
  };

  const addToFavorites = async (id) => {
    await axios.patch(`/cards/card-like/${id}`);
    try {
      const { data } = await axios.get("/cards/cards");
      setCardsArr(data);
    } catch (err) {
      console.log("Error fetching updated card list", err);
    }
  };
  const deleteCardFromInitialCardsArr = async (id) => {
    try {
      console.log("id", id);
      setCardsArr((cardsArr) => cardsArr.filter((item) => item._id != id));
      console.log("cardsArr", cardsArr);
      await axios.delete("cards/" + id);
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };
  return (
    <Box>
      <CssBaseline />
      <h1>Favorite</h1>

      {cardsArr.filter((item) => item.likes == idUser).length == 0 ? (
        <h2>Your favorite cards cart is empty</h2>
      ) : (
        <h2>Here You Can See All Your Favorite Cards</h2>
      )}
      <Grid container spacing={2}>
        {cardsArr &&
          cardsArr
            .filter((item) => item.likes.includes(idUser))
            .map((item) => (
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
                  onFavorites={addToFavorites}
                  canEdit={payload && (payload.biz || payload.isAdmin)}
                  canDelete={payload && payload.isAdmin}
                  canUser={payload && payload._id}
                  cardIdUser={item.user_id}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};
export default FavoritePage;
