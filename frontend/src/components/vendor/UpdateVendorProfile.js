import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateVendorProfile,
  loadVendor,
  clearErrors,
} from "../../actions/vendorActions";
import { UPDATE_VENDOR_PROFILE_RESET } from "../../constants/vendorConstants";

const UpdateVendorProfile = ({ history }) => {
  const [vendorname, setVendorName] = useState("");
  const [shopname, setShopName] = useState("");
  const [shopaddress, setShopAddress] = useState("");
  const [vendorcontactno, setVendorContactNo] = useState("");
  const [shopcontactno, setShopContactNo] = useState("");
  const [vendoremail, setVendorEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  const { vendor } = useSelector((state) => state.vendor);
  const { error, isUpdated, loading } = useSelector((state) => state.vendorr);

  useEffect(() => {
    if (vendor) {
      //if user exist in state then we set the values
      setVendorName(vendor.vendorname);
      setShopName(vendor.shopname);
      setShopAddress(vendor.shopaddress);
      setVendorContactNo(vendor.vendorcontactno);
      setShopContactNo(vendor.shopcontactno);
      setVendorEmail(vendor.vendoremail);

      setAvatarPreview(vendor.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
      console.log("got it");
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadVendor());

      history.push("/vendor");

      dispatch({
        type: UPDATE_VENDOR_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("vendorname", vendorname);
    formData.set("shopname", shopname);
    formData.set("shopaddress", shopaddress);
    formData.set("vendorcontactno", vendorcontactno);
    formData.set("shopcontactno", shopcontactno);
    formData.set("vendoremail", vendoremail);
    formData.set("avatar", avatar);

    dispatch(updateVendorProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Update Vendor Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Vendor Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Vendor Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="vendorname"
                value={vendorname}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Shop Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="shopname"
                value={shopname}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Shop Address</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="shopaddress"
                value={shopaddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Vendor Contact No</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="vendorcontactno"
                value={vendorcontactno}
                onChange={(e) => setVendorContactNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Shop Contact No</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="shopcontactno"
                value={shopcontactno}
                onChange={(e) => setShopContactNo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field"> Vendor Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="vendoremail"
                value={vendoremail}
                onChange={(e) => setVendorEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateVendorProfile;
