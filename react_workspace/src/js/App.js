import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminLogin from "./components/AdminLogin";
import AdminSite from "./components/AdminSite";
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
        <Route exact path='/admin_login' component={AdminLogin} />
        <Route exact path='/admin' component={AdminSite} />
      </Switch>
    </BrowserRouter>
  );
}


ReactDOM.render((
  <App />
), document.getElementById('app'))