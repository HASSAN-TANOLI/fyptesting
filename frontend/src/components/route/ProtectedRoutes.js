import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticatedVendor, loadingg, vendor } = useSelector(
    (state) => state.vendor
  );
  return (
    <Fragment>
      {loadingg === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticatedVendor === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && vendor.role === "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoutes;
