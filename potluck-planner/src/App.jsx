
import React from 'react';
import {Link, Route,Switch} from 'react-router-dom';
import EventForm from './components/EventForm.jsx';
// import InviteeForm from './components/InviteeForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import UserAccount from './components/UserAccount.jsx';
import Events from './components/Events.jsx';
import './main.css'


function App() {
  return (
    <div className="main-div">
       <nav className = "div-nav-bar">
         <h1>Welcome to Potluck Planner</h1>
         <div  className = "nav-bar ">
          <Link className = "nav-link" to="/"> Home </Link>
          <Link className = "nav-link" to="/loginform"> Log In </Link>
          <Link className = "nav-link" to="/eventform"> Create an Event </Link>
          <Link className = "nav-link" to="/inviteeform"> Join event </Link>
          <Link className = "nav-link" to="/listevents"> Ongoing events </Link>
                
    
         </div>
       </nav>
       <Switch>
          <Route exact path="/"        component ={UserAccount} />
          <Route path="/loginform"     component = {LoginForm}   />
          <Route path="/eventform"     component = {EventForm}   />
          {/* <Route path="/inviteeform"   component = {InviteeForm} /> */}
          <Route path ="/listevents"   component={Events} />
       </Switch>



    <div data-testid='app' className="App">
      
    </div>
  </div>
  );
};

export default App;
