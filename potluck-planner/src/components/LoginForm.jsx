import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
// deleted unused import
import '../main.css'

const LoginForm = () => {
  // Keep array of users
  const initialUserState = {
    username: "",
    password: "",
    organizer: false,
  };
  const [users, setUsers] = useState([]);

  // Post
//   const [post, setPost] = useState(); // where is 'post' used?

  // Disable submit button initially
  const [disabled, setDisabled] = useState(true);

  // Keep user
  const [user, setUser] = useState(initialUserState);

  // Keep errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    organizer: "",
  });

  const userSchema = yup.object().shape({
    username: yup
      .string()
      .required("User name is required")
      .min(2, "The name must have at more than two letters"),
    password: yup
      .string()
      .required("Create a password")
      .min(6, "The password must have more than six characters"),
    organizer: yup.boolean(),
  });

  const setFormErrors = (name, value) => {
    yup
      .reach(userSchema, name)
      .validate(value)
      .then((valid) => {// where is this parameter coming from and where is it used?
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
    const NewUser = { ...user };
    setUsers([...users, NewUser]);// I don't understand what's going on here. It looks like NewUser is getting added to the app instead of to the database
    axios
      .post(`${BASE_URL}/auth/register`, NewUser)// was this supposed to be a signup form?
      .then((response) => {
        console.log(response.data);
        setUser(initialUserState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitFc} data-testid="LoginForm" className = "form-style">
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

        <label>
          {" "}
          I am an organizer
          <input
            name="organizer"
            type="checkbox"
            checked={user.organizer}
            onChange={changeFc}
          />
        </label>

        <br></br>
        <br></br>
        {errors.organizer.length > 0 ? (
          <p style={{ color: "red" }}>{errors.organizer}</p>
        ) : null}

        <button className="button-style" disabled={disabled} type="submit">
          {" "}
          Join potlock planner!
        </button>
        <br></br>
        <br></br>

        {/* <pre>{JSON.stringify(post,null,2)}</pre> */}
      </form>
    </div>
  );
};

export default LoginForm;

//username
//password
//isOrganizer
