import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducers,
  productDetailsReducer,
  newProductReducer,
  productReducer,
  allProductsReducers,
  newReviewReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducers";

import { vendorReducer, vendorrReducer, allVendorsReducer } from "./reducers/vendorReducers";

import { cartReducer } from "./reducers/cartReducers";

import {newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allProducts: allProductsReducers,
  newReview: newReviewReducer,

  auth: authReducer,
  vendor: vendorReducer,
  vendorr: vendorrReducer,
  allVendors: allVendorsReducer,
  

  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,

  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

      shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
