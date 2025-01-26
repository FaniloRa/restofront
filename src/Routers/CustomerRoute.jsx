import React from "react";
import { Navbar } from "./../component/Navbar/Navbar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./../component/Home/Home";
import RestaurantDetails from "./../component/Restaurant/RestaurantDetails";
import Cart from "./../component/Cart/Cart";
import Profile from "./../component/Profile/Profile";
import Auth from "./../component/Auth/Auth";

const CustomerRoute = () => {
  return (
    <div className="relative">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/account/:register" element={<Home />} />
        <Route
          exact
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRoute;
