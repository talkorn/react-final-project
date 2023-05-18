import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const SuperProtectedRoute = ({ element, isAdmin, isBiz }) => {
  //* logic section
  const isLoggedIn = useSelector((store) => store.authSlice.isLoggedIn);
  const payload = useSelector((store) => store.authSlice.payload);
  //* html section
  if (isLoggedIn) {
    if (isAdmin && payload && payload.isAdmin) {
      return element;
    } else {
      if (isBiz && payload && payload.biz) {
        return element;
      }
    }
  } else {
    toast.error("invalid permissions");
  }

  return <Navigate to={ROUTES.LOGIN} />;
};
SuperProtectedRoute.propTypes = {
  element: PropTypes.object,
  isAdmin: PropTypes.bool,
  isBiz: PropTypes.bool,
};
SuperProtectedRoute.defaultProps = {
  isAdmin: false,
  isBiz: false,
};
export default SuperProtectedRoute;
