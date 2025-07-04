import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./component/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import CustomerRoute from "./Routers/CustomerRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./component/State/Authentication/Action";

function App() {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [auth.jwt]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <CustomerRoute />
      </ThemeProvider>
    </div>
  );
}

export default App;
