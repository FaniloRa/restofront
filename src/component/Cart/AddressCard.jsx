import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex space-x-5 w-64 p-5">
      <HomeIcon />

      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          quasi, molestiae vero porro delectus aliquid ex,
        </p>

        {showButton && (
          <Button
            onClick={() => handleSelectAddress(item)}
            variant="outlined"
            className="w-full"
          >
            select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
