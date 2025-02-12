import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizedIngredients } from "./../util/CategorizeIngredients";
import { addItemToCart } from "./../State/Cart/cart.action";
import { useDispatch } from "react-redux";

const demo = [
  {
    category: "Nuts & seeds",
    ingredients: ["Cashews"],
  },
  {
    category: "Protein",
    ingredients: ["Protein", "Bacon Strips"],
  },
];

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      console.log("yes");
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      console.log("no");
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <Accordion slotProps={{ heading: { component: "h4" } }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:space-x-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images}
              alt=""
            />
          </div>
          <div className="space-y-1 px-4 lg:space-y-5 lg:max-w-2xl">
            <p className="font-semibold text-xl">{item.name}</p>
            <p>{item.price}</p>
            <p className="text-gray-400">{item.description}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizedIngredients(item?.ingredients))?.map(
              (category) => (
                <div className="pr-5">
                  <p>{category}</p>
                  <FormGroup>
                    {categorizedIngredients(item?.ingredients)[category].map(
                      (ingredient, index) => (
                        <FormControlLabel
                          key={ingredient.name}
                          control={
                            <Checkbox
                              checked={selectedIngredients.includes(
                                ingredient.name
                              )}
                              onChange={() =>
                                handleCheckboxChange(ingredient.name)
                              }
                              disabled={!ingredient.inStoke}
                            />
                          }
                          label={ingredient.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div>
            <Button variant="contained" disabled={false} type="submit">
              {true ? "Add to cart" : "Out of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
