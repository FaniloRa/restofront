import React from "react";
import { Card, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const RestaurantCart = ({ data }) => {
  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={data.images[2]}
          alt=""
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={data?.open ? "success" : "error"}
          label={data?.open ? "open" : "closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">{data.name}</p>
          <p className="text-gray-500 text-sm">{data.description}</p>
        </div>
      </div>
      <div className="">
        <IconButton>
          {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  );
};

export default RestaurantCart;
