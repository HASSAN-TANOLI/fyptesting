import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { vendorLoginn, clearErrors } from "../../actions/vendorActions";

const VendorLogin = ({ history, location }) => {
  const [vendoremail, setVendorEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticatedVendor, error, loading } = useSelector(
    (state) => state.vendor
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticatedVendor) {
      window.location.replace("/");
      // history.push('redirect');
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, isAuthenticatedVendor, error, history]);

  const submitHandler = (e) => {
    e.preventDefault(); //prevent it from reloading

    dispatch(vendorLoginn(vendoremail, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Vendor Login"} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Vendor Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Vendor Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={vendoremail}
                    onChange={(e) => setVendorEmail(e.target.value)}
                  />
                </div>

                <d iv className="form-group">
                  <label htmlFor="password_field">Vendor Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </d>

                <Link to="/vendorpassword/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/registervendor" className="float-right mt-3">
                  New Vendor?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default VendorLogin;
