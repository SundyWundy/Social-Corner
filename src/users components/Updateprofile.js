import React, {useEffect, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Alert from '@mui/material/Alert';
import { Link, useHistory } from 'react-router-dom';

import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"

import  Grid  from '@mui/material/Grid';
import  Box  from '@mui/material/Box';
import './Updateprofile.css'

export default function Updateprofile() {
    const emailref = useRef();
    const passwordref = useRef();
     const passwordconfirmref = useRef();
     const fnameref = useRef();
     const lnameref= useRef();
     const {currentUser, updateemail, updatepassword, 
        updateFirstName,updateLastName, updateProfilePic,
    getDocument, user} = useAuth()
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
     const history = useHistory()

     

    
    const [image, setimage] = useState()
    const [url, seturl] = useState(user && user.profilepicture)
    const [errorUpload, setUploaderror] = useState()

    const [refreshdoc, setrefreshdoc] = useState(false)

    useEffect(()=>{
    getDocument()
    }, // eslint-disable-next-line
    [refreshdoc])


 function handleChange(e){
        if(e.target.files[0]){
            setimage(e.target.files[0])
        }
    }

 function handleUpload(){
        const storage = getStorage();
        const storageRef = ref(storage, `${currentUser.uid}/images/${image.name}`)

        uploadBytes(storageRef, image).then((snapshot) =>{
            getDownloadURL(storageRef).then((url) =>{
                seturl(url)
                setrefreshdoc(!refreshdoc)
                updateProfilePic(url)

            })
            .catch((errorUpload) =>{
                setUploaderror("Failed to upload file")
            })
        })
    }
 

     function handleSubmit(e){
         e.preventDefault()

         if (passwordref.current.value !== passwordconfirmref.current.value){
             return setError('Passwords do not match!')
         }

         const promises = []
         setLoading(true)
         setError("")

         if (emailref.current.value !== currentUser.email){
             promises.push(updateemail(emailref.current.value))
         }
         if (passwordref.current.value !== currentUser.password){
             promises.push(updatepassword(passwordref.current.value))
         }

         if(fnameref.current.value !== user.firstname){
            promises.push(updateFirstName(fnameref.current.value))
         }

        if(lnameref.current.value !== user.lastname){
            promises.push(updateLastName(lnameref.current.value))
        }
          

         Promise.all(promises).then(()=>{
             history.push('/profile')
         }).catch(()=>{
             setError('Failed to update account')
         }).finally(()=>{
             setLoading(false)
         })
     }
    return (
        <div>
            
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
            <h1>Update Profile</h1>
            {error && <Alert severity="error">{error}</Alert>}
           
            <img className="imgUpdateProfile" src={url} alt="none"/>

            <div>
            {errorUpload && <Alert severity="error">{errorUpload}</Alert>}
            <input type="file" accept=".jpg
            " onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            </div>
           
            <form onSubmit={handleSubmit}>
            <div className="form">
            <div>
            <label>
                Email:
                <input type="email" ref={emailref} email="email" required defaultValue={currentUser.email}/>
            </label>
            </div>
            <div>
            <label>
                First Name:
                <input type="name" ref={fnameref} firstname="firstname" defaultValue={user && user.firstname}/>
            </label>
            </div>
            <div>
            <label>
                Last Name:
                <input type="name" ref={lnameref} defaultValue={user && user.lastname}/>
            </label>
            </div>
            <div>
            <label>
                Password:
                <input type="password" ref={passwordref} password="password" placeholder="Leave blank to keep the same"/>
            </label>
            </div>
            <div>
             <label>
                Password Confirmation:
                <input type="password" ref={passwordconfirmref} password="password" placeholder="Leave blank to keep the same"/>
            </label>
            </div>
            </div>
            <input disabled={loading} type="submit" value="Update"/>
            </form>
            Already have an account? <Link to="/profile"> Cancel</Link>
            </Grid>
            <Grid xs={3}></Grid>
            </Grid>
            </Box>
        </div>
    )
}
