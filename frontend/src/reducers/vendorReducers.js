import {
  LOGIN_VENDOR_REQUEST,
  LOGIN_VENDOR_SUCCESS,
  LOGIN_VENDOR_FAIL,
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
  UPDATE_VENDOR_PROFILE_RESET,
  ALL_VENDORS_REQUEST,
  ALL_VENDORS_SUCCESS,
  ALL_VENDORS_FAIL,
  CLEAR_ERRORS,
} from "../constants/vendorConstants";

export const vendorReducer = (state = { vendor: {} }, action) => {
  switch (action.type) {
    case LOGIN_VENDOR_REQUEST:
    case REGISTER_VENDOR_REQUEST:
    case LOAD_VENDOR_REQUEST:
      return {
        loadingg: true,
        isAuthenticatedVendor: false,
      };

    case LOGIN_VENDOR_SUCCESS:
    case REGISTER_VENDOR_SUCCESS:
    case LOAD_VENDOR_SUCCESS:
      return {
        ...state,
        loadingg: false,
        isAuthenticatedVendor: true,
        vendor: action.payload,
      };

    case LOGOUT_VENDOR_SUCCESS:
      return {
        loadingg: false,
        isAuthenticatedVendor: false,
        vendor: null,
      };

    case LOAD_VENDOR_FAIL:
      return {
        loadingg: false,
        isAuthenticatedVendor: false,
        vendor: null,
        error: action.payload,
      };

    case LOGOUT_VENDOR_FAIL:
      return {
        ...state,
        erroe: action.payload,
      };

    case LOGIN_VENDOR_FAIL:
    case REGISTER_VENDOR_FAIL:
      return {
        ...state,
        loadingg: false,
        isAuthenticatedVendor: false,
        vendor: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const vendorrReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_VENDOR_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        idUpdated: action.payload, //is updated mean we only have to check whether user is updated or not on the backend we have a success variable that will be true or false.
      };

    case UPDATE_VENDOR_PROFILE_RESET:
      return {
        ...state,
        isUpdated: false, //after updating the user i have to set isUpdated to false so that the user can update the profile again.
      };

    case UPDATE_VENDOR_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//getting all user reducers
export const allVendorsReducer = (state = {vendors: []}, action) => {
  switch (action.type) {
    
    case ALL_VENDORS_REQUEST:
      return {
        ...state,
        loading: true,
      
      };

   

    case ALL_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: action.payload,
      };

    
    case ALL_VENDORS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
