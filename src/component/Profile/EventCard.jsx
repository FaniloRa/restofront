import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const EventCard = ({ item, isCustomer }) => {
  const handleDeleteEvent = () => {};
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{
            height: 345,
            "&:hover": {
              transform: "scale(1.1)", // Example: Scale the image on hover
              transition: "transform 0.5s ease-in-out", // Example: Apply a smooth transition effect
            },
          }}
          image={
            "https://img.freepik.com/photos-gratuite/restaurant-interieur_1127-3394.jpg"
          }
          title="green iguana"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Petite Boof
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Anarzna
          </Typography>
          <div className="py-2 space-y-2">
            <p>Ambozotany</p>
            <p className="text-sm text-blue-500">12h</p>
            <p className="text-sm text-red-500">20h</p>
          </div>
        </CardContent>
        {/* {!isCustomer && (
          <CardActions>
            <IconButton
              onClick={handleDeleteEvent}
              aria-label="add to favorites"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )} */}
      </Card>
    </div>
  );
};

export default EventCard;
