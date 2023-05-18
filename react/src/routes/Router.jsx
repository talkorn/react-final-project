import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogIn";
import CardPage from "../pages/Card";
import EditPage from "../pages/EditPage";
import FavoritePage from "../pages/Favorite";
import AddCardPage from "../pages/AddCard";
import MyCardsPage from "../pages/MyCards";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import SandBoxPage from "../pages/SandBoxPage";
import NestedPage1 from "../pages/NestesPage1";
import NestedPage2 from "../pages/NestedPage2";
import NestedPage3 from "../pages/NestedPage3";
import ProfilePage from "../pages/ProfilePage";
import CrmTable from "../pages/CrmPage";
import UserPage from "../pages/UserPage";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "../components/ProtectedRoute";

const Router = () => {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route
          path={ROUTES.FAVCARDS}
          element={<ProtectedRoute element={<FavoritePage />} />}
        />
        <Route path={ROUTES.LOGIN} element={<LogInPage />} />
        <Route path={ROUTES.LOGOUT} element={<HomePage />} />
        <Route
          path={ROUTES.PROFILE}
          element={<ProtectedRoute element={<ProfilePage />} />}
        />

        <Route
          path="/edit/:id"
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={true}
              element={<EditPage />}
            />
          }
        />
        <Route
          path={ROUTES.ADDCARD}
          element={
            <SuperProtectedRoute
              isAdmin={false}
              isBiz={true}
              element={<AddCardPage />}
            />
          }
        />
        <Route
          path={ROUTES.MYCARDS}
          element={
            <SuperProtectedRoute
              isAdmin={false}
              isBiz={true}
              element={<MyCardsPage />}
            />
          }
        />
        <Route
          path="/user/:id"
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<UserPage />}
            />
          }
        />
        <Route
          path={ROUTES.CRM}
          element={
            <SuperProtectedRoute
              isAdmin={true}
              isBiz={false}
              element={<CrmTable />}
            />
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path={"/sandbox"}
          element={<ProtectedRoute element={<SandBoxPage />} />}
        >
          <Route path="nestedpage1" element={<NestedPage1 />} />
          <Route path="nestedpage2" element={<NestedPage2 />} />
          <Route path="nestedpage3" element={<NestedPage3 />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </Container>
  );
};
export default Router;
