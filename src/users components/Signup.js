import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Alert from '@mui/material/Alert';
import { Link, useHistory } from 'react-router-dom';
import  Grid  from '@mui/material/Grid';
import  Box  from '@mui/material/Box';
import './Signup.css'

export default function Signup() {
    const emailref = useRef();
    const passwordref = useRef();
     const passwordconfirmref = useRef();
     const {signup, currentUser, addUserToCollection} = useAuth()
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const history = useHistory()
     const [email, setEmail] = useState()

     async function handleSubmit(e){
         e.preventDefault()

         if (passwordref.current.value !== passwordconfirmref.current.value){
             return setError('Passwords do not match!')
         }

         try {
             setError("")
             setLoading(true)
             await signup(emailref.current.value, passwordref.current.value)
             setEmail(emailref.current.value)
             
             history.push("/profilestart")
         }catch{
             setError('Failed to create an account!')
         }
         setLoading(false)
         
          if(currentUser === null){
                
             }else{
                 await addUserToCollection(email)
             }
             
     }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
            <h1>Sign Up</h1>
            {error && <Alert severity="error">{error}</Alert>}
           
            <form onSubmit={handleSubmit}>
            <div className="signupform">
            <div>
            <label>
                Email:
                <input type="email" ref={emailref} email="email" required/>
            </label>
            </div>
            <div>
            <label>
                Password:
                <input type="password" ref={passwordref} password="password" required/>
            </label>
            </div>
            <div>
            <label>
                Password Confirmation:
                <input type="password" ref={passwordconfirmref} password="password" required/>
            </label>
            </div>
            </div>
            <input disabled={loading} type="submit" value="Sign Up"/>
            </form>
            Already have an account? <Link to="/login"> Log In</Link>
            </Grid>
            <Grid item xs={4}></Grid>
            </Grid>
            </Box>
        </div>
    )
}
