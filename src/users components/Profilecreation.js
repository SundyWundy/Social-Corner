import React,{useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { Alert } from '@mui/material'

export default function Profilecreation() {
    const {addUserToCollection, currentUser} = useAuth()
    const FirstRef = useRef()
    const LastRef = useRef()
    const history = useHistory()
    const [loading, setloading] = useState(false)

    const [image, setimage] = useState()
    const [url, seturl] = useState()
    const [error, seterror] = useState()
    
    function addUserToCol(e){
      e.preventDefault()

      setloading(true)
      addUserToCollection(FirstRef.current.value, LastRef.current.value, url)
      history.push("/Dashboard")
      setloading(false)
    }

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
            })
            .catch((error) =>{
                seterror("Failed to upload file")
            })
        })
    }
    
    return (
        <div>
            Hello, let create your account
            <br></br>
            Email: {currentUser && currentUser.email}
            <br></br>
            First Name: <input type="text" ref={FirstRef}/>
            <br></br>
            Last Name: <input type="text" ref={LastRef} />

            <br></br>
            
            {error && <Alert severity="error">{error}</Alert>}
            <input type="file" accept=".jpg
            " onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <img src={url} alt="random"/>

            <br></br>
            <button disabled={loading} onClick={addUserToCol}>SUBMIT</button>
        </div>
    )
}
