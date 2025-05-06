import * as api from "../../api/index.js";

export const createMyWishListAction = (newWishList) => async (dispatch) => {
  try {
    const { data } = await api.CreateMyWishlistAPI(newWishList);
    dispatch({ type: "ADD_TO_MY_WISH_LIST", data: data?.result });
    console.log("action.data", data?.result);  
    return { success: true, message: "My Wish List created successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const getMyWishListAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getMyWishlistAPI(userId);
    dispatch({ type: "GET_MY_WISH_LIST", data: data?.result });
    return { success: true, message: "My Wish List fetched successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};

export const updateMyWishlistAction =
  (id, updatedWishList) => async (dispatch) => {
    try {
      const { data } = await api.updateMyWishlistAPI(id, updatedWishList);
      dispatch({ type: "UPDATE_MY_WISH_LIST", data: data?.result });  
      console.log("action.data", data?.result);  
      return { success: true, message: "My Wish List updated successfully" };
    } catch (err) {
      console.log(err);
      return { success: false, message: err?.response?.data?.message };
    }
  };

export const deleteMyWishlistAction = (id) => async (dispatch) => {
  try {
    await api.deleteMyWishlistAPI(id);
    dispatch({ type: "DELETE_MY_WISH_LIST", data: id });
    return { success: true, message: "My Wish List deleted successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: err?.response?.data?.message };
  }
};
