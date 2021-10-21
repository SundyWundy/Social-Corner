import React, {useEffect} from 'react'
import "./Navigationbar.css"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {Link} from "react-router-dom"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useAuth } from '../contexts/AuthContext'



export default function Navigationbar() {
    const {getDocument, user} = useAuth()

    useEffect(()=>{
        getDocument()
    }, // eslint-disable-next-line 
    [])

    /*
     const user= {
        name: "Terry", 
        picture: "https://www.pngitem.com/pimgs/m/245-2453631_elizabeth-gintama-png-transparent-png.png"
    }
  */
    return (
        <div>
            
      <Box className="theBar" sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
              <Grid className="titlesection" item xs={4}>
         <Link className="title" to="/">
                SocialCorner
                </Link>
        <SearchIcon className="searchicon" />
        <input className="SearchBar" placeholder="Search for friend" />
           </Grid>
           <Grid className="iconsection" item xs={6}>
                <Link to="/" >
                <HomeIcon className="navicon" fontSize="large"/>
                </Link>
                <Link to="/video">
                <OndemandVideoIcon className="navicon" fontSize="large"/>
                </Link>
                <Link to="/market">
                <StorefrontIcon className="navicon" fontSize="large"/>
                </Link>
                
     </Grid>
        <Grid item xs={2}>
      <Link className="profilesection" to="/profile">
               <img className="profilepicture" src={user && user.profilepicture} alt={user && user.firstname}/>
                </Link>
                </Grid>
                </Grid>
      
    </Box>
        </div>
        
    )
}


/*
<nav className="navbar">
                <Link className="title" to="/">
                SocialCorner
                </Link>
                <SearchIcon className="searchicon" />
                <input className="SearchBar" placeholder="Search for friend" />
               
                
                <Link to="/" >
                <HomeIcon className="navicon" fontSize="large"/>
                </Link>
                <Link to="/video">
                <OndemandVideoIcon className="navicon" fontSize="large"/>
                </Link>
                <Link to="/market">
                <StorefrontIcon className="navicon" fontSize="large"/>
                </Link>
                
                 
                 
                <Link to="/">
               <img className="profilepicture" src={user.picture} alt={user.name}/>
                </Link>
                
            </nav>
          
*/ 