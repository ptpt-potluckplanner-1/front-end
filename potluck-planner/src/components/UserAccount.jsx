import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import axios from 'axios';
import { date } from 'yup/lib/locale';
import {BASE_URL} from '../constants/constants'

const UserAccount = () => {

    // Get array of users
    const [users, setUsers] = useState([]);

    // Post
    const [post, setPost] = useState();

    // Disable submit button initially
    const [disabled , setDisabled ] = useState(true)

    // Keep user   
    const [user, setUser] = useState({ username:"", password:"",  });

    // Keep errors   
    const [errors, setErrors] = useState({ username:"", password:"", });

    const userSchema = yup.object().shape({
            username: yup.string().required("User name is required"),
            password:yup.string().required("Create a password"),

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
    },[userSchema,user]);

    const submitFc = (e) =>{
        e.preventDefault();  
        axios
        .post(`${BASE_URL}/auth/login`,user)
          .then(response => {
            setUsers(response.data);
            setUser({ username:"", password:"", }); 

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


                <button  disabled ={disabled} type ="submit"> Log In!</button>
                <br></br><br></br>

                <pre>{JSON.stringify(post,null,2)}</pre>

            </form>
            
        </div> );
    }
    // return ( <div data-testid='loginform'  >LoginForm</div> );
// }
 
export default UserAccount;

//username
//password
//isOrganizer