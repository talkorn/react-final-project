import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { darkModeActions } from "../store/darkMode";

const CheckboxComponnent = () => {
  const isDarkMode = useSelector((store) => store.darkModeSlice.isDarkMode);
  const dispatch = useDispatch();
  const changeMode = () => {
    dispatch(darkModeActions.changeMode());
  };
  return (
    <Checkbox
      edge="start"
      icon={<WbSunnyIcon color="secondary" />}
      checkedIcon={<ModeNightIcon color="warning" />}
      checked={isDarkMode}
      onClick={changeMode}
    />
  );
};
export default CheckboxComponnent;
