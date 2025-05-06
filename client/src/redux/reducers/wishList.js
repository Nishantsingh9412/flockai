const initialState = {};

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WISH_LIST":
      return { ...state, wishList: action.data };
    case "ADD_TO_WISH_LIST":
      return { ...state, wishList: [...state.wishList, action.data] };
    // case "UPDATE_WISH_LIST":
    //   return {
    //     ...state,
    //     wishList: state.wishList.map((item) =>
    //       item._id === action.data._id ? action.data : item
    //     ),
    //   };
    case "REMOVE_FROM_WISH_LIST":
      return {
        ...state,
        wishList: state.wishList.filter((item) => item._id !== action.data),
      };
    default:
      return state;
  }
};

export default wishListReducer;
