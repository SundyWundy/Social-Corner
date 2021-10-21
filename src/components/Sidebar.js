import React, {useState} from 'react'
import './Sidebar.css'
import Grid from '@mui/material/Grid';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

export default function Sidebar() {
    const [toggle ,settoggle] = useState(false);
    const [toggleSeeMore, settoggleSeeMore] = useState("See More");
    const sidemenu = [
        {
            activity: "Feed",
            icon: <RssFeedIcon/>,
            page: "/"
        },
         {
            activity: "Friends",
            icon: <PeopleIcon/>,
            page: "/"
        },
         {
            activity: "Groups",
            icon: <GroupsIcon/>,
            page: "/"
        },
         {
            activity: "Videos",
            icon: <OndemandVideoIcon/>,
            page: "/video"
        },
        {
            activity: "Marketplace",
            icon: <StorefrontIcon/>,
            page: "/market"
        }
    ]

    const moremenu = [
        {
            activity: "Jobs",
            icon: <WorkOutlineIcon/>,
            page: "/jobs"
        },
        {
            activity: "Favorites",
            icon: <FavoriteBorderIcon/>,
            page: "/favorite"
        }
    ]

    const show = () =>{
        settoggle(!toggle);
        if(toggle === false){
            settoggleSeeMore("See Less");
        }
        else{
            settoggleSeeMore("See More");
        }
    }
    return (
        <div className="sidebar">

            {
                sidemenu.map(({activity, icon, page})=>(
                    <Link className="linkbox" to={page}>
                    <div className="sidemenubox">
                        <Grid container spacing={.5}>
                        <Grid className="sideicon" item xs={2}>
                        {icon}
                        </Grid>
                        <Grid item xs={10}>
                        <h3>{activity}</h3>
                        </Grid>
                        </Grid>
                        
                    </div>
                    </Link>
                ))
            }

             {
                moremenu.map(({activity, icon, page})=>(
                    <Link className="linkbox" to={page}>
                    <div className="sidemenubox">
                        {toggle === true &&
                        <Grid container spacing={.5}>
                        <Grid className="sideicon" item xs={2}>
                        {icon}
                        </Grid>
                        <Grid item xs={10}>
                        <h3>{activity}</h3>
                        </Grid>
                        </Grid>
                        }
                    </div>
                    </Link>
                ))
            }

            <div className="sidemenubox" onClick={show}>
                        <Grid container spacing={.5}>
                        <Grid className="sideicon" item xs={2}>
                        <ExpandMoreIcon />
                        </Grid>
                        <Grid item xs={10}>
                        <h3 className="textSee">{toggleSeeMore}</h3>
                        </Grid>
                        </Grid>
            </div>
           
        </div>
    )
}
