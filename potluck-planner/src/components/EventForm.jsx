import React, {useState, useEffect} from 'react';
import {Link, Route} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Events from './Events';
import {BASE_URL} from '../constants/constants'

const EventForm = () => {
    
    // Keep array of events
    const [events, setEvents] = useState([]);

    // Post
    const [eventPost, seteventPost] = useState();

     // Keep events
    const [event, setEvent] = useState({ organizer_id:"", title:"", location:"", date:"", time:""});
    // Keep errors   
    const [errors, setErrors] = useState({ title:"", location:"", date:"", time:"",});

    // Disable submit button initially
    const [disabled , setDisabled ] = useState(true)


    const eventSchema = yup.object().shape({
            title: yup.string().required("Event name is required").min(2, "The event must have at more than two letters"),
            location:yup.string().required("Create a Event location is required").min(2, "Location must have more than six characters"),
            date: yup.date().required("Must enter date"),
            time: yup.string().required("start time cannot be empty")

            
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
            const NewEvent = {...event, organizer_id: Date.now()} // GREG FIX THIS NOW PLEASEEEEEE WITH ORGANIZER_ID

            setEvents([...events,NewEvent]); /// add id
            e.preventDefault();  
            axios
              .post(`${BASE_URL}//organizer/potluck`, NewEvent)
              .then(response => {
                seteventPost(response.data);
                setEvent({organizer_id: "", title:"", location:"", date:"", time:"" ,});
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
                    <input id = 'eventname' name = 'title' value = {event.title} type = 'text' onChange={changeFc} />
                    <br></br><br></br>
                    {errors.title.length > 0 ? <p style ={{color:'red'}} >{errors.title}</p> : null}

                    <label htmlFor='location'> Where is the event taking place ? </label>
                    <br></br>
                    <input id = 'location' name = 'location' value = {event.location} type = 'text' onChange={changeFc} />
                    <br></br><br></br>
                    {errors.location.length > 0 ? <p style ={{color:'red'}} >{errors.location}</p> : null}

                    <label htmlFor='date'> When is the event taking place? </label>
                    <br></br>
                    <input id = 'date' name = 'date' type = 'date' value = {event.date} onChange={changeFc}/>
                    <br></br><br></br>
                    {errors.date.length > 0 ? <p style ={{color:'red'}} >{errors.date}</p> : null}

                    <label htmlFor='time'> Whhat time? </label>
                    <br></br>
                    <input id = 'time' name = 'time' type = 'time' value = {event.time} onChange={changeFc}/>
                    <br></br><br></br>
                    {errors.time.length > 0 ? <p style ={{color:'red'}} >{errors.time}</p> : null}

                    <button  disabled ={disabled} type ="submit"> Start Planning!</button>

                    <pre>{JSON.stringify(eventPost,null,2)}</pre>

                </form>

            </div> 

            <div className="App">
                
            </div>
        </div>
    );
    return ( <div data-testid='eventForm' >EventForm Component</div> );
}
 
export default EventForm;