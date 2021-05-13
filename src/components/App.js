import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { autologin } from "../client";

function App() {
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    autologin()
      .then(setUser)
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/profile">
            {user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <h1>You must log in to see this page!</h1>
            )}
          </Route>
          <Route path="/">
            <h1>Please Login or Sign Up</h1>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
