import React, { useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Feed.css'

export default function Feed() {
    const {user, getDocument} = useAuth()
    
    useEffect(()=>{
        getDocument()
    }, // eslint-disable-next-line 
    [])
    
    const feed = [
        {
            profile: "",
            name: "League of Legends",
            description: "Season 2021 ends November 15! Celebrate with Victorious Blitzcrank and more rewards!",
            picture: "https://cdn1.dotesports.com/wp-content/uploads/2021/10/05102941/League-VictoriousBlitzcrank-scaled.jpg",
        },
         {
            profile: "",
            name: "League of Legends",
            description: "Season 2021 ends November 15! Celebrate with Victorious Blitzcrank and more rewards!",
            picture: "https://cdn1.dotesports.com/wp-content/uploads/2021/10/05102941/League-VictoriousBlitzcrank-scaled.jpg",
        }
    ]
    return (
        <div className="feedbody">
            
            <img className="userpicture" src={user && user.profilepicture} alt="user.name"/>
            <input className="feedinput" placeholder={`What's on your mind, ${user && user.firstname}?`} />
            {
                feed.map(({name, description, picture})=>(
                    <div className="feed">
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <img src={picture} alt="name" />
                    </div>
                ))
            }
        </div>
    )
}
