import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { date } from 'yup/lib/locale';

const InviteeForm = () => {

    // Keep array of events
    const [invitees, setInvitees] = useState([]);

    // Post
    const [post, setPost] = useState();

    // Disable submit button initially
    const [disabled , setDisabled ] = useState(true)

   // Keep invitees
    const [invitee, setInvitee] = useState({ id: "", event:"", name:"", bring:"", agree: false,});
    // Keep errors   
    const [errors, setErrors] = useState({ event:"", name:"", bring:"", agree:"",});

    // Validation schema
    // const nameRegex = /^[A-Za-z]+$/;
    const inviteeSchema = yup.object().shape({
        event: yup.string().required("Event name is required").min(2, "The event must have at more than two letters"),
        name: yup.string().required("Your name is required").min(2, "The name must have at more than two letters"),
        bring: yup.string().matches(/^[aA-zZ\s]+$/, "Only English letters").min(2, "List what you bring to the event"),
        agree: yup.boolean().oneOf([true], "You must accept Terms and Conditions") 
    })

    // Set feedback from errors
    const setFormErrors = (name,value) =>{
        yup.reach(inviteeSchema, name).validate(value)
        .then(valid => { setErrors({...errors, [name]: ""});
        })
        .catch(err => {
            console.log('errooorrsss', err.errors)
            setErrors({...errors, [name]: err.errors[0]});
        });
    }


    const changeFc = e =>{
                e.persist(); // pass event into validate function
                setInvitee({...invitee, [e.target.name]: e.target.type === 'checkbox'? e.target.checked : e.target.value})
                setFormErrors(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value)
                console.log(invitee)
            }
    
    useEffect(()=>{
                inviteeSchema.isValid(invitee).then(valid => setDisabled(!valid))
            },[invitee]);
    
    const submitFc = (e) =>{
                const NewInvitee = {...invitee, id: date.now()}
                setInvitees([...invitees,NewInvitee]);
                e.preventDefault();  
                axios
                  .post("https://reqres.in/api/users", NewInvitee)
                  .then(response => {
                    setPost(response.data);
                    setInvitee({ id: "", event:"", name:"", bring:"", agree: false,});
                  })
                  .catch(err => {
                    console.log(err);
                  });
            }

        return ( 

        <div>
            <form onSubmit ={submitFc}>

                <label htmlFor='event'> Which event do you plan to attend ? </label>
                <br></br>
                <input id = 'event' name = 'event' type = 'text' value = {invitee.event} onChange={changeFc}/>
                <br></br><br></br>

                <label htmlFor='name'> Tell us your name </label>
                <br></br>
                <input id = 'name' name = 'name' type = 'text' value = {invitee.name} onChange={changeFc} />
                <br></br><br></br>

                <label htmlFor='bring'> What do you plan to bring? </label>
                <br></br>
                <textarea id = 'bring' name = 'bring' type = 'text' value =  {invitee.bring}  onChange={changeFc}/>
                <br></br><br></br>

                <label> Review info befor joining ...
                    <input name = 'agree' type = 'checkbox' checked ={invitee.agree} onChange={changeFc} />
                    </label>
                    <br></br><br></br>

                <button type ="submit" >Join the event!</button>

            </form>

            <pre>{JSON.stringify(post,null,2)}</pre>
            
        </div> );
    }
    
export default InviteeForm;