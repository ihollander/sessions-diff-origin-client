import React, { useState } from "react";
import { updateUser } from "../client";

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({
    username: user.username,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser(formData).then(setUser);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{user.username}'s Profile</h1>

      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        autoComplete="off"
        value={formData.username}
        onChange={handleChange}
      />

      <input type="submit" value="Update" />
    </form>
  );
}

export default Profile;
