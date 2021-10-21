import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Profile.css'
import  Grid  from '@mui/material/Grid';
import  Box  from '@mui/material/Box';


import Alert from '@mui/material/Alert'

export default function Profile() {
    const {currentUser, logout, getDocument, user} = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

useEffect(()=>{
    getDocument()
}, // eslint-disable-next-line
[])

    async function handleLogout(){
        setError("")

        try{
            await logout()
            history.push("/login")
        } catch{
            setError('Failed to log out')
        }
    }
    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
        <h1>Profile</h1>
         {error && <Alert severity="error">{error}</Alert>}

        
        <img className="imgProfile" src={user && user.profilepicture} alt="None"/>
        
       
        <div className="userInfo">
        <Grid container justifyContent="center" rowSpacing={1}>
        <Grid item xs={2.5}>
        Email:    
        </Grid>
        <Grid item xs={6}>
        {currentUser && currentUser.email} 
        </Grid> 
        </Grid>

        <Grid container justifyContent="center" rowSpacing={1}> 
        <Grid item xs={2.5}>
        Name:
        </Grid>
        <Grid item xs={6}>
        {user && user.firstname} {user && user.lastname}   
        </Grid>
        </Grid>
        </div>

       </Grid>
       <Grid item xs={4}></Grid>
       </Grid>
        </Box>
        <div className="Navbtn">
        <button onClick={()=>{history.push("/")}}>Dashboard</button>
        <button><Link className="updateProfilebtn" to="/update-profile" >Update Profile</Link></button>
        <button onClick={handleLogout}>Log out </button>
        </div>
        
        </div>
    )
}
