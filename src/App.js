import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './users components/Signup';
import Login from './users components/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Profile from './users components/Profile';
import Forgotpassword from './users components/Forgotpassword';
import Updateprofile from './users components/Updateprofile';
import Dashboard from './components/Dashboard';
import Profilecreation from './users components/Profilecreation';



function App() {
  return ( 
    
    <BrowserRouter>
    <AuthProvider>
    <div className="App">


    <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/profilestart" component={Profilecreation} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/forgot-password" component={Forgotpassword} />
      <PrivateRoute path="/update-profile" component={Updateprofile} />

    
      <PrivateRoute path="/" component={Dashboard} />
        </Switch>
    </div>
    
   </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
