import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}


ReactDOM.render((
  <App />
), document.getElementById('app'))