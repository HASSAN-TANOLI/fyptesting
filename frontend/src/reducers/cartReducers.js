import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  RESET_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  //cart items mean what does user has selected how many items he selected
  switch (action.type) {
    case RESET_CART:
      return {
        cartItems: [],
        shippingInfo: {},
      };

    case ADD_TO_CART:
      const item = action.payload; //payload is the product we have put it in the cart
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      ); //find the product in the cart

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], //if item is not in the cart then add it to the cart
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload), //action.payload will be the id of that product that i want to remove from the cart. so i will filter out all the product instead that i want to delete.
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
