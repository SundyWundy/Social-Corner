import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Alert from '@mui/material/Alert';
import { Link} from 'react-router-dom';
import './Forgotpassword.css'

export default function Forgotpassword() {
    const emailref = useRef();
     const {resetpassword} = useAuth()
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const [message, setMessage] = useState("");

     async function handleSubmit(e){
         e.preventDefault()

         try {
             setMessage("")
             setError("")
             setLoading(true)
             await resetpassword(emailref.current.value)
             setMessage('Check your inbox for further instructions')
         }catch{
             setError('Failed to reset password')
         }

         setLoading(false)
     }
    return (
        <div>
            <h1>Password Reset</h1>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            
            <form onSubmit={handleSubmit}>
            
            <label>
                Email:
                <input className="Email" type="email" ref={emailref} email="email" required/>
            </label>
           
            <input disabled={loading} type="submit" value="Reset Password"/>
            </form>

            <div>
                <Link to="/login">Login</Link>
            </div>
          
        </div>
    )
}
