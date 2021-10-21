import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import './Contacts.css'
import { useAuth } from '../contexts/AuthContext';

export default function Contacts() {
    const [friends, setfriend] = useState()
    const{getUserDocumentFriends, userFriends} = useAuth()
    
    useEffect(()=>{
        getUserDocumentFriends()
    }, // eslint-disable-next-line
    [])

    const friend = [
        {
            name: "Terry Suvasukayuphuket",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa0xWm_eSR7s2fkq0M_weuES3NIdIL7QH7nw&usqp=CAU"
        },
         {
            name: "Terry Suvalopiaerosia",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa0xWm_eSR7s2fkq0M_weuES3NIdIL7QH7nw&usqp=CAU"
        },
         {
            name: "Terry Suva",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa0xWm_eSR7s2fkq0M_weuES3NIdIL7QH7nw&usqp=CAU"
        },
    ]
    return (
        <div className="contactbody">
             <h2>Contacts</h2>

             {userFriends && userFriends}
            {
                friend.map(({name, photo})=>(
                    <Link className="contactlinkbox" to={name}>
                    <div className="contactbox">
                        <Grid container spacing={0}>
                        <Grid item xs={3}>
                        <img className="contactimage" src={photo} alt={name}/>
                        </Grid>
                        <Grid className="contacttext" item xs={9}>
                        <h3>{name}</h3>
                        </Grid>
                        </Grid>
                    </div>
                    </Link>
                ))
            }
            
        </div>
    )
}
