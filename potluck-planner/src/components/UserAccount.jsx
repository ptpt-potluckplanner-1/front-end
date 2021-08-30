import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
// deleted unused import
import { BASE_URL } from "../constants/constants";
import '../main.css'

const UserAccount = () => {
  // Get array of users
  // eslint-disable-next-line
  const [users, setUsers] = useState([]); // "users" will store array of users

  // Post
  // const [post, setPost] = useState();//with nothing to setPost, there is no post, so the reference will be undefined

  // Disable submit button initially
  const [disabled, setDisabled] = useState(true);

  // Keep user
  const [user, setUser] = useState({ username: "", password: "" });

  // Keep errors
  const [errors, setErrors] = useState({ username: "", password: "" });

  const userSchema = yup.object().shape({
    username: yup.string().required("User name is required"),
    password: yup.string().required("Create a password"),
  });

  // Set feedback from errors
  const setFormErrors = (name, value) => {
    yup
      .reach(userSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        console.log("errooorrsss", err.errors);
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  };

  const changeFc = (e) => {
    e.persist(); // pass event into validate function
    setUser({
      ...user,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    setFormErrors(
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
    console.log(user);
  };

  useEffect(() => {
    userSchema.isValid(user).then((valid) => setDisabled(!valid));
  }, [userSchema, user]);

  const submitFc = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/auth/login`, user)
      .then((response) => {
        setUsers(response.data);
        setUser({ username: "", password: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div data-testid="loginform">
      <form onSubmit={submitFc} className = "form-style">
        <label htmlFor="username"> Tell us your name </label>
        <br></br>
        <input
          id="username"
          name="username"
          value={user.username}
          type="text"
          onChange={changeFc}
        />
        <br></br>
        <br></br>
        {errors.username.length > 0 ? (
          <p style={{ color: "red" }}>{errors.username}</p>
        ) : null}

        <label htmlFor="password"> Create a password </label>
        <br></br>
        <input
          id="password"
          name="password"
          type="password"
          onChange={changeFc}
        />
        <br></br>
        <br></br>
        {errors.password.length > 0 ? (
          <p style={{ color: "red" }}>{errors.password}</p>
        ) : null}

        <button className="button-style" disabled={disabled} type="submit">
          {" "}
          Log In!
        </button>
        <br></br>
        <br></br>

        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </form>
    </div>
  );
};

export default UserAccount;

//username
//password
//isOrganizer
