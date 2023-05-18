import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CallIcon from "@mui/icons-material/Call";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

const CardComponent = ({
  id,
  title,
  subTitle,
  description,
  phone,
  img,
  web,
  state,
  country,
  city,
  street,
  email,
  houseNumber,
  zipCode,
  bizNumber,
  onClick,
  onEdit,
  onDelete,
  onFavorites,
  idUser,
  likes,
  canEdit,
  canUser,
  canDelete,
  cardIdUser,
}) => {
  const [showCallWindow, setShowCallWindow] = React.useState(false);

  const handleCallClick = () => {
    setShowCallWindow(true);
  };

  const handleCloseCallWindow = () => {
    setShowCallWindow(false);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => onClick(id)}
        component="img"
        sx={{ height: 140 }}
        image={img}
        title={title}
      />{" "}
      <CardContent onClick={() => onClick(id)}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          {subTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Phone: "} {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Address: "}
          {country} {city} {street} {houseNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Card Number: "}
          {bizNumber}
        </Typography>
      </CardContent>
      <CardActions>
        {canDelete || (canEdit && cardIdUser === idUser) ? (
          <Button size="small" onClick={() => onDelete(id)}>
            <DeleteIcon />
          </Button>
        ) : (
          ""
        )}
        {canEdit && cardIdUser === idUser ? (
          <Button variant="text" color="warning" onClick={() => onEdit(id)}>
            Edit
          </Button>
        ) : (
          ""
        )}
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          {canUser ? (
            <Button size="small" onClick={() => onFavorites(id)}>
              {likes.includes(idUser) ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon color="secondary" />
              )}
            </Button>
          ) : (
            ""
          )}
          <Button size="small" onClick={handleCallClick}>
            <CallIcon />
          </Button>{" "}
          {showCallWindow && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ebe9b7",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Call Us {phone}
              </Typography>

              <Button variant="contained" onClick={handleCloseCallWindow}>
                Close
              </Button>
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  phone: PropTypes.string.isRequired,
  web: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  houseNumber: PropTypes.string.isRequired,
  zipCode: PropTypes.number,
  bizNumber: PropTypes.string,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
