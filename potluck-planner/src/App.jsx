import React from 'react';
import {Link, Route,Switch} from 'react-router-dom';
import EventForm from './components/EventForm.jsx';
import InviteeForm from './components/InviteeForm.jsx';
import LoginForm from './components/LoginForm.jsx';



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
    
         </div>
       </nav>
       <Switch>
          <Route exact path="/" />
          <Route path="/loginform"   component ={LoginForm}/>
          <Route path="/eventform"   component ={EventForm}/>
          <Route path="/inviteeform" component ={InviteeForm}/>
       </Switch>



    </div>
  );
}

export default App;