import React, { useEffect } from "react";
import "./Home.css";
import { MultiItemCaoursel } from "./MultiItemCaoursel";
import RestaurantCart from "./../Restaurant/RestaurantCart";
import { useDispatch } from "react-redux";
import { getAllRestaurantsAction } from "./../State/Restaurant/restaurant.action";

const restaurant = [1, 1, 1, 1, 1, 1];

const Home = () => {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllRestaurantsAction(jwt));
  });

  return (
    <div className="">
      <section className="banner z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xlk font-bold z-10 py-5">Zosh Food</p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Test the Convenience: Food, Fast and Delivered
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-10">
        <p className="text-2xl font-semibold text-gray-300 py-3 pb-10">
          Top Meels
        </p>
        <MultiItemCaoursel />
      </section>
      <section className="px-5 lg:px-20">
        <h1 className="text-2xl font-semibold text-gray-400 py-3">
          Order From Our Handpicked Favorites
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {restaurant.map((item) => (
            <RestaurantCart />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
