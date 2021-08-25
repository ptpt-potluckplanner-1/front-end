import React, {useState, useEffect} from 'react';
import {Link, Route} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Events from './Events';

const EventForm = () => {
<<<<<<< HEAD
    
    // Keep array of events
    const [events, setEvents] = useState([]);

    // Post
    const [eventPost, seteventPost] = useState();

     // Keep events
    const [event, setEvent] = useState({ id:"", eventname:"", location:"", date:"", agree:false,});
    // Keep errors   
    const [errors, setErrors] = useState({  eventname:"", location:"", date:"", agree:"",});

    // Disable submit button initially
    const [disabled , setDisabled ] = useState(true)


    const eventSchema = yup.object().shape({
            eventname: yup.string().required("Event name is required").min(2, "The event must have at more than two letters"),
            location:yup.string().required("Create a Event location is required").min(2, "Location must have more than six characters"),
            date: yup.date().required("Must enter date"),
            agree: yup.boolean().oneOf([true], "You must accept Terms and Conditions") 
            
        })  
        
    // Set feedback from errors
    const setFormErrors = (name,value) =>{
            yup.reach(eventSchema, name).validate(value)
            .then(valid => { setErrors({...errors, [name]: ""});
            })
            .catch(err => {
                console.log('errooorrsss', err.errors)
                setErrors({...errors, [name]: err.errors[0]});
            });
        }

    const changeFc = e =>{
            e.persist(); // pass event into validate function
            setEvent({...event, [e.target.name]: e.target.type === 'checkbox' ?  e.target.checked : e.target.value})
            setFormErrors(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value)
            console.log(event)
        }

    useEffect(()=>{
            eventSchema.isValid(event).then(valid => setDisabled(!valid))
        },[event]);
    
    const submitFc = (e) =>{
            const NewEvent = {...event, id: Date.now()}

            setEvents([...events,NewEvent]); /// add id
            e.preventDefault();  
            axios
              .post("https://reqres.in/api/users", NewEvent)
              .then(response => {
                seteventPost(response.data);
                setEvent({id: "", eventname:"", location:"", date:"", agree:false,});
              })
              .catch(err => {
                console.log(err);
              });
        }

       
    return ( 
        <div>
            
            <div>
                <form onSubmit ={submitFc}> 
                    <label htmlFor='eventname'> Pick a name for your event </label>
                    <br></br>
                    <input id = 'eventname' name = 'eventname' value = {event.eventname} type = 'text' onChange={changeFc} />
                    <br></br><br></br>
                    {errors.eventname.length > 0 ? <p style ={{color:'red'}} >{errors.eventname}</p> : null}

                    <label htmlFor='location'> Where is the event taking place ? </label>
                    <br></br>
                    <input id = 'location' name = 'location' value = {event.location} type = 'text' onChange={changeFc} />
                    <br></br><br></br>
                    {errors.location.length > 0 ? <p style ={{color:'red'}} >{errors.location}</p> : null}

                    <label htmlFor='date'> When is the event taking place? </label>
                    <br></br>
                    <input id = 'date' name = 'date' type = 'datetime-local' value = {event.date} onChange={changeFc}/>
                    <br></br><br></br>
                    {errors.date.length > 0 ? <p style ={{color:'red'}} >{errors.date}</p> : null}

                    <label> Are you all set ?
                            <input name = 'agree' type = 'checkbox' checked ={event.agree} onChange={changeFc}/>
                            </label>
                            <br></br><br></br>
                            {errors.agree.length > 0 ? <p style ={{color:'red'}} >{errors.agree}</p> : null}

                    <button  disabled ={disabled} type ="submit"> Start Planning!</button>

                    <pre>{JSON.stringify(eventPost,null,2)}</pre>

                    

                </form>

            </div> 

            <div className="App">
                
                <h4> Check ongoing events</h4>
                <br></br><br></br>
                <Events eventslist={events}/>

                {/* <Link to="/listevents"> Ongoing events </Link> */}
                {/* <Route exact path ="/listevents"   render={() => <Events eventslist={events}/>}/> */}
                
            </div>
        </div>
    );
=======
    return ( <div data-testid='eventForm' >EventForm Component</div> );
>>>>>>> main
}
 
export default EventForm;