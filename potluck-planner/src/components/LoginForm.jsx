import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import axios from 'axios';
import { date } from 'yup/lib/locale';

const LoginForm = () => {

    // Keep array of users
    const [users, setUsers] = useState([]);

    // Post
    const [post, setPost] = useState();

    // Disable submit button initially
    const [disabled , setDisabled ] = useState(true)

    // Keep user   
    const [user, setUser] = useState({ id:"", username:"", password:"", isOrganizer: false, }); // agree: false, 

    // Keep errors   
    const [errors, setErrors] = useState({ username:"", password:"", isOrganizer: "",  }); //agree: "",

    const userSchema = yup.object().shape({
            username: yup.string().required("User name is required").min(2, "The name must have at more than two letters"),
            password:yup.string().required("Create a password").min(6, "The password must have more than six characters"),
            isOrganizer: yup.boolean(),
            // agree: yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
        })


    // Set feedback from errors
    const setFormErrors = (name,value) =>{
            yup.reach(userSchema, name).validate(value)
            .then(valid => { setErrors({...errors, [name]: ""});
            })
            .catch(err => {
                console.log('errooorrsss', err.errors)
                setErrors({...errors, [name]: err.errors[0]});
            });
        }

    const changeFc = e =>{
            e.persist(); // pass event into validate function
            setUser({...user, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value})
            setFormErrors(e.target.name, e.target.type === "checkbox" ? e.target.checked : e.target.value)
            console.log(user)
        }

    useEffect(()=>{
        userSchema.isValid(user).then(valid => setDisabled(!valid))
    },[user]);

    const submitFc = (e) =>{
        const NewUser ={...user, id: date.now()}
        setUsers([...users,NewUser]);
        e.preventDefault();  
        axios
          .post("https://potluckplanner-backend.herokuapp.com/api/auth/register", NewUser)
          .then(response => {
            setPost(response.data);
            setUser({ id:"", username:"", password:"", isOrganizer: false,  }); // agree: false,
          })
          .catch(err => {
            console.log(err);
          });

    }

    return ( 

        <div>
            <form onSubmit={submitFc}>

                <label htmlFor='username'> Tell us your name </label>
                <br></br>
                <input id = 'username' name = 'username' value = {user.username} type = 'text' onChange={changeFc}/>
                <br></br><br></br>
                {errors.username.length > 0 ? <p style ={{color:'red'}} >{errors.username}</p> : null}

                <label htmlFor='password'> Create a password </label>
                <br></br>
                <input id = 'password' name = 'password' type = 'password' onChange={changeFc}/>
                <br></br><br></br>
                {errors.password.length > 0 ? <p style ={{color:'red'}} >{errors.password}</p> : null}

                <label> I am an organizer 
                    <input name = 'isOrganizer'  type = 'checkbox' checked ={user.isOrganizer} onChange={changeFc}/>
                </label>
       
                <br></br><br></br>
                {errors.isOrganizer.length > 0 ? <p style ={{color:'red'}} >{errors.isOrganizer}</p> : null}

                {/* <label> Terms and conditions
                <input type = 'checkbox' name ="agree" checked={user.agree} onChange={changeFc} />
                </label>
                <br></br><br></br>
                {errors.agree.length > 0 ? <p style ={{color:'red'}} >{errors.agree}</p> : null} */}

                <button  disabled ={disabled} type ="submit"> Join potlock planner!</button>
                <br></br><br></br>
                

                <pre>{JSON.stringify(post,null,2)}</pre>

            </form>
            
        </div> );
    }
    // return ( <div data-testid='loginform'  >LoginForm</div> );
// }
 
export default LoginForm;

//username
//password
//isOrganizer