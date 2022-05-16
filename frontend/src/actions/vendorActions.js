import axios from "axios";

import {
  LOGIN_VENDOR_REQUEST,
  LOGIN_VENDOR_SUCCESS,
  LOGIN_VENDOR_FAIL,
  CLEAR_ERRORS,
  REGISTER_VENDOR_REQUEST,
  REGISTER_VENDOR_SUCCESS,
  REGISTER_VENDOR_FAIL,
  LOAD_VENDOR_REQUEST,
  LOAD_VENDOR_SUCCESS,
  LOAD_VENDOR_FAIL,
  LOGOUT_VENDOR_SUCCESS,
  LOGOUT_VENDOR_FAIL,
  UPDATE_VENDOR_PROFILE_REQUEST,
  UPDATE_VENDOR_PROFILE_SUCCESS,
  UPDATE_VENDOR_PROFILE_FAIL,
  ALL_VENDORS_REQUEST,
  ALL_VENDORS_SUCCESS,
  ALL_VENDORS_FAIL,
} from "../constants/vendorConstants";

// Login
export const vendorLoginn = (vendoremail, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_VENDOR_REQUEST });

    const config = {
      //because we are sending post request
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/loginvendor",
      { vendoremail, password },
      config
    );

    dispatch({
      type: LOGIN_VENDOR_SUCCESS,
      payload: data.vendor,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_VENDOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Register User
export const registerVendor = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_VENDOR_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/registervendor",
      userData,
      config
    );

    dispatch({
      type: REGISTER_VENDOR_SUCCESS,
      payload: data.vendor,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_VENDOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load vendor

export const loadVendor = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_VENDOR_REQUEST });

    const { data } = await axios.get("/api/v1/vendor");

    dispatch({
      type: LOAD_VENDOR_SUCCESS,
      payload: data.vendor,
    });
  } catch (error) {
    dispatch({
      type: LOAD_VENDOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

//LogoutUser
export const logoutVendor = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logoutvendor");

    dispatch({
      type: LOGOUT_VENDOR_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_VENDOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update vendor Profile
export const updateVendorProfile = (vendorData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_VENDOR_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      "/api/v1/vendor/update",
      vendorData,
      config
    );

    dispatch({
      type: UPDATE_VENDOR_PROFILE_SUCCESS,
      payload: data.vendor,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_VENDOR_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all Vendors
export const allVendors = () => async (dispatch) => {
  try {
    console.log("calling all vendors");
    dispatch({ type: ALL_VENDORS_REQUEST });
    console.log("helo");
    const req = await axios.get("/api/v1/admin/vendors");
    console.log("data got", req);

    dispatch({
      type: ALL_VENDORS_SUCCESS,
      payload: req.data.vendors,
    });
  } catch (error) {
    console.log("catch error");
    dispatch({
      type: ALL_VENDORS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors

export const clearErrors =  (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
