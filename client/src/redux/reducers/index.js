import { combineReducers } from "redux";

import authReducer from "./auth";
import myWishListReducer from "./myWishList";
import wishListReducer from "./wishList";


export default combineReducers({
    auth: authReducer,
    myWishlist: myWishListReducer,
    wishList: wishListReducer,
});