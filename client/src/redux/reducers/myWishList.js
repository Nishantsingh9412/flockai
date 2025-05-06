const initialState = {
  myWishList: [],
  activeWishList: null,
};

const myWishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_WISH_LIST":
      return { ...state, myWishList: action.data };
    case "ADD_TO_MY_WISH_LIST":
      console.log("reducer.data", action.data);
      return { ...state, myWishList: [...state.myWishList, action.data] };
    case "ACTIVE_MY_WISH_LIST":
      return { ...state, activeWishList: action.data };
    case "UPDATE_MY_WISH_LIST":
      // console.log("reducer.data", action.data);
      return { ...state, myWishList: state.myWishList.map((item) =>
        item._id === action.data._id ? action.data : item
      ) };
    // return {
    //   ...state,
    //   myWishList: state.myWishList.map((item) =>
    //     item._id === action.data._id ? action.data : item
    //   ),
    // };
    case "REMOVE_FROM_MY_WISH_LIST":
      return {
        ...state,
        myWishList: state.myWishList.filter((item) => item._id !== action.data),
      };
    default:
      return state;
  }
};

export default myWishListReducer;
