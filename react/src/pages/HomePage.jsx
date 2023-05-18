import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import useQueryParams from "../hooks/useQueryParam.js";
import filterFunction from "../utilis/filterFunc.js";
import { toast } from "react-toastify";
const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  /*  const LoggedIn = useLoggedIn(); */
  const searchParams = useQueryParams();
  const payload = useSelector((store) => store.authSlice.payload);

  useEffect(() => {
    /*  dispatch(); */
    /* LoggedIn(); */

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
      const { data } = await axios.get("http://localhost:8181/api/cards/cards");
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
  return (
    <Box>
      <CssBaseline />
      <h1>Cards Page</h1>
      <h2>Here You Can Find All Our Buisness Cards</h2>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id + Date.now()}>
            {" "}
            <CardComponent
              likes={item.likes}
              idUser={idUser}
              cardIdUser={item.user_id}
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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};
export default HomePage;
