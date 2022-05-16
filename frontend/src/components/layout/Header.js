import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../../actions/userActions";
import { resetCart } from "../../actions/cartActions";
import { logoutVendor } from "../../actions/vendorActions";

import Search from "./Search";

import "../../App.css";
import "./header.css";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { vendor, loadingg } = useSelector((state) => state.vendor);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(resetCart());
    dispatch(logoutUser());
    dispatch(logoutVendor());
    alert.success("Logged out successfully");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img className="image" src="/images/logo1.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0  searchbar">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0  text-center">
          <Link to="/pcbuildd" className="btn ml-1" id="login_btn">
            Build Pc
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-8">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {" "}
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-3 dropdown d-inline">
              <Link
                to=""
                className=" btn dropdown-toggle mr-4 text-white"
                type="button"
                id="dropDownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              <div className="dropdown-menu" aria-labelledby="dropDownMenuLink">
                <Link className="dropdown-item" to="/orders/user">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/user">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  logout
                </Link>
              </div>
            </div>
          ) : (
            !vendor && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}

          {vendor ? (
            <div className="ml-3 dropdown d-inline" key={vendor}>
              <Link
                to=""
                className=" btn dropdown-toggle mr-4 text-white"
                type="button"
                id="dropDownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={vendor.avatar && vendor.avatar.url}
                    alt={vendor && vendor.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{vendor && vendor.vendorname}</span>
              </Link>

              <div className="dropdown-menu" aria-labelledby="dropDownMenuLink">
                {vendor && vendor.role !== "vendor" ? (
                  <Link className="dropdown-item" to="orders/user">
                    orders
                  </Link>
                ) : (
                  <Link className="dropdown-item" to="/dashboard">
                    {" "}
                    Dashboard{" "}
                  </Link>
                )}
                <Link className="dropdown-item" to="/vendor">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  logout
                </Link>
              </div>
            </div>
          ) : (
            !user && (
              <Link to="/loginvendor" className="btn mr-4" id="login_btn">
                Vendor Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
