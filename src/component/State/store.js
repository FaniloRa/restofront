import authReducer from "./Authentication/Reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/order.reducer";
import restaurantsOrderReducer from "./Admin/Order/restaurants.order.reducer";
import { ingredientReducer } from "./Ingredients/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,

  restaurantsOrder: restaurantsOrderReducer,
  ingredients: ingredientReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
