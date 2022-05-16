import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

const VendorProfile = () => {
  const { vendor, loadingg } = useSelector((state) => state.vendor);
  return (
    <div>
      <Fragment>
        {loadingg ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title={"Your profile"} />
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                  <img
                    className="rounded-circle img-fluid"
                    src={vendor.avatar.url}
                    alt={vendor.name}
                  />
                </figure>
                <Link
                  to="/vendor/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="col-12 col-md-5">
                <h4>Vendor Name</h4>
                <p>{vendor.vendorname}</p>

                <h4>Shop Name</h4>
                <p>{vendor.shopname}</p>

                <h4>Shop Address</h4>
                <p>{vendor.shopname}</p>

                <h4>Email Address</h4>
                <p>{vendor.shopaddress}</p>

                <h4>Vendor Contact No</h4>
                <p>{vendor.vendorcontactno}</p>

                <h4>Shop Contact No</h4>
                <p>{vendor.shopcontactno}</p>

                <h4>Vendor Address</h4>
                <p>{vendor.vendor}</p>

                <h4>Joined On</h4>
                <p>{String(vendor.createdAt).substring(0, 10)}</p>

                {vendor.role !== "vendor" && (
                  <Link
                    to="/order/user"
                    className="btn btn-danger btn-block mt-5"
                  >
                    My Orders
                  </Link>
                )}

                <Link
                  to="/password/update"
                  className="btn btn-primary btn-block mt-3"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default VendorProfile;
