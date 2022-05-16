import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
 
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  SELECT_ALL_PRODUCT_REQUEST,
  SELECT_ALL_PRODUCT_SUCCESS,
  SELECT_ALL_PRODUCT_FAIL,

  NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,

  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProducts =
  (keyword = "", currentPage = 1, price, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`; //in this case price of 0 is 1 Rs

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Product detail function
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Product detail function

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create New Product
export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//deleting a product

export const deleteProduct = (id) => async (dispatch) => { //passing id of that product
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

   

    const { data } = await axios.delete(
      `/api/v1/admin/product/${id}`,
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


//Delete Product
export const updateProduct = (id, productData) => async (dispatch) => { //passing id and product data which we want to update
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//action for getting all products for Pc build

export const allProducts = () => async (dispatch) => {
  try {

      dispatch({ type: SELECT_ALL_PRODUCT_REQUEST });

      const { data } = await axios.get('/api/v1/admin/products')

      dispatch({
          type: SELECT_ALL_PRODUCT_SUCCESS,
          payload: data.products
      })

  } catch (error) {
      dispatch({
          type: SELECT_ALL_PRODUCT_FAIL,
          payload: 'Error occured while loading products'
      })
  }
}

// new review actions
export const newReview = (reviewData) => async (dispatch) => {
  try {

      dispatch({ type: NEW_REVIEW_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const { data } = await axios.put(`/api/v1/review`, reviewData, config)

      dispatch({
          type: NEW_REVIEW_SUCCESS,
          payload: data.success
      })

  } catch (error) {
      dispatch({
          type: NEW_REVIEW_FAIL,
          payload: error.response.data.message
      })
  }
}



//Clear Errors

export const clearErrors =  (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
