import React from 'react';
import {Link, Route,Switch} from 'react-router-dom';
import EventForm from './components/EventForm.jsx';
import InviteeForm from './components/InviteeForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import UserAccount from './components/UserAccount.jsx';
import Events from './components/Events.jsx';


function App() {
  return (
    <div className="App">
       <nav>
         <h1>Welcome to Potluck Planner</h1>
         <div>
          <Link to="/"> Home </Link>
          <Link to="/loginform"> Log In </Link>
          <Link to="/eventform"> Create an Event </Link>
          <Link to="/inviteeform"> Join event </Link>
          <Link to="/listevents"> Ongoing events </Link>
                
    
         </div>
       </nav>
       <Switch>
          <Route exact path="/"        component ={UserAccount} />
          <Route path="/loginform"     component = {LoginForm}   />
          <Route path="/eventform"     component = {EventForm}   />
          <Route path="/inviteeform"   component = {InviteeForm} />
          <Route path ="/listevents"   component={Events} />
       </Switch>



    <div data-testid='app' className="App">
      App Component
    </div>
  </div>
  );
};

export default App;