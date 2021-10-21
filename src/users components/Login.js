import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Alert from '@mui/material/Alert';
import { Link, useHistory } from 'react-router-dom';
import  Grid  from '@mui/material/Grid';
import  Box  from '@mui/material/Box';
import './Login.css'

export default function Login() {
    const emailref = useRef();
    const passwordref = useRef();
     const {login} = useAuth()
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const history = useHistory()

     async function handleSubmit(e){
         e.preventDefault()

         try {
             setError("")
             setLoading(true)
             await login(emailref.current.value, passwordref.current.value)
             history.push("/")
         }catch{
             setError('Failed to sign in')
         }

         setLoading(false)
     }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
            
            <h1>Login</h1>
            {error && <Alert severity="error">{error}</Alert>}
            
            <form onSubmit={handleSubmit}>
            <div className="loginform">
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
            </div>
            <input disabled={loading} type="submit" value="Sign In"/>
            </form>

            <div>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            </Grid>
            <Grid item xs={4}></Grid>
            </Grid>
            </Box>
            Don't have an account
            <Link to="/signup"> Sign Up</Link>
        </div>
    )
}
