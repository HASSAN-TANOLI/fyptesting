import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registerVendor, clearErrors } from "../../actions/vendorActions";

const RegisterVendor = ({ history, location }) => {
  const [vendor, setVendor] = useState({
    vendorname: "",
    shopname: "", //using an object
    shopaddress: "",
    vendorcontactno: "",
    shopcontactno: "",
    vendoremail: "",
    password: "",
  });

  const {
    vendorname,
    shopname,
    shopaddress,
    vendorcontactno,
    shopcontactno,
    vendoremail,
    password,
  } = vendor;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  ); //preview the image before uploading

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticatedVendor, error, loading } = useSelector(
    (state) => state.vendor
  );

  const redirect = history.location.search
    ? history.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (isAuthenticatedVendor) {
      history.push(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, isAuthenticatedVendor, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("vendorname", vendorname);
    formData.set("shopname", shopname);
    formData.set("shopaddress", shopaddress);
    formData.set("vendorcontactno", vendorcontactno);
    formData.set("shopcontactno", shopcontactno);
    formData.set("vendoremail", vendoremail);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(registerVendor(formData)); //dispatching the action
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      //if target value is avatar i have to handle the avatar
      const reader = new FileReader(); // in else i will handle name email and password

      reader.onload = () => {
        //when we read the targer.file we pass to callback and check
        if (reader.readyState === 2) {
          // three ready states 0 mean reader is created
          //1 mean reader is processing 2 mean reader is ready to use
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setVendor({ ...vendor, [e.target.name]: e.target.value }); //whatever in the user i spread user to get it. and then i add the name and value e.g name = email and target value is email
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register Vendor"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register Vendor</h1>

            <div className="form-group">
              <label htmlFor="email_field">Vendor Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="vendorname"
                value={vendorname}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Vendor Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="vendoremail"
                value={vendoremail}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
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
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false} //when user press register i will dispatch the userRegister request while its loading i will disable the button
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterVendor;
