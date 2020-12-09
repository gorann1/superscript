import React from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';


import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './App.css';

export const Routes: React.FC = () => {
    
  return ( 
  <BrowserRouter>
    <div>
      <header>
        <div className="">
          <Link to="/">Home </Link>
        </div>
        <div className="">
          <Link to="/register">Register </Link>
        </div>
        <div className="">
          <Link to="/login">Login </Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home}  />      
        <Route exact path="/register" component={Register}  />      
        <Route exact path="/login" component={Login}  />      
      </Switch>
    </div>
  </BrowserRouter>
  )
};  