import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

const Register = ({ history, location }) => {
  const [user, setUser] = useState({
    name: "",
    email: "", //using an object
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  ); //preview the image before uploading

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticatedUser, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = history.location.search
    ? history.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (isAuthenticatedUser) {
      history.push(redirect);
      alert.success("You are now logged in");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, isAuthenticatedUser, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData)); //dispatching the action
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
      setUser({ ...user, [e.target.name]: e.target.value }); //whatever in the user i spread user to get it. and then i add the name and value e.g name = email and target value is email
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register User</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
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

export default Register;
