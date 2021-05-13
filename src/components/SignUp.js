import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signup } from "../client";

function SignUp({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup(formData)
      .then((user) => {
        setUser(user);
        history.push("/profile");
      })
      .catch((data) => {
        setErrors(data.errors);
      });
  }

  const { username, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>

      <label>Username</label>
      <input
        type="text"
        name="username"
        autoComplete="off"
        value={username}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange}
      />

      {errors.map((error) => (
        <p style={{ color: "red" }} key={error}>
          {error}
        </p>
      ))}
      <input type="submit" value="Signup" />
    </form>
  );
}

export default SignUp;
