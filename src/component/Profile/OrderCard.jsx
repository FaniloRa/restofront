import { Button, Card } from "@mui/material";
import React from "react";

const OrderCard = ({ order, status }) => {
  return (
    <Card className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src="https://healthnewshub.org/wp-content/uploads/2024/03/Fast-Food-Restaurants.jpg"
          alt=""
        />
        <div>
          <p>Burgur Frite</p>
          <p className="text-gray-400">₹798</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed" variant="contained">
          Completed
        </Button>
      </div>
    </Card>
  );
};

export default OrderCard;
