import { isPresentInFavorites } from "./../../config/logic";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  GET_USER_REQUEST,
  RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [],
  success: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case REQUEST_RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Register Success",
      };

    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        // favorites:[action.payload,...state.favorites],
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
      };

    default:
      break;
  }
};

export default authReducer;
