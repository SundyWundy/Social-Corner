import  Grid  from '@mui/material/Grid';
import  Box  from '@mui/material/Box';
import { Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navigationbar from './Navigationbar';
import Video from './Video';
import Feed from './Feed';
import Contacts from './Contacts';
import Sidebar from './Sidebar';
import Market from './Market';

export default function Dashboard() {
    return (
        <div>
        <Container>
        <Box sx={{ flexGrow: 1 }}>
        <Navigationbar />
        <Grid className="bodybox" container spacing={2}>
        <Grid className="leftsection" item xs={3}>
       <Sidebar />
        </Grid>
        <Grid item xs={6}>
          
          <Route path="/" component={Feed} exact/>
          <Route path="/video" component={Video} exact/>
          <Route path="/market" component={Market} exact/>
        
        </Grid>
        <Grid className="contactsection" item xs={3}>
        <Contacts />
          </Grid>

        </Grid>
        </Box>
        </Container>
        </div>
    )
}
