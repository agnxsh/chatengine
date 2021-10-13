import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//react-router-dom is a library that allows you to have multiple application in a react application
//react-context is like a mega object that stores all the relevant information about the attributes with which we're going to wrap
import { AuthProvider } from "../contexts/AuthContext";

import Login from "./Login";
import Chats from "./Chats";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          {/* <AuthProvider> */}
          <Switch>
            <Route path="/Chats" component={Chats} />
            <Route path="/" component={Login} />
          </Switch>
          {/* </AuthProvider> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
