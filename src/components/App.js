import React,{ useState } from 'react'
import Signup from './Signup';
import Reset from './Reset';
import History from './History';
import Navbar from '../sidebar/Sidebar';
import LoginForm from '../login/LoginForm';
import Modal from '../modal/AppModal';
import Map from './Map'
import Create from './Signup';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import '../cssPages/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  
  const adminUser = { 
    email: "admin@admin",
    password: "admin"
}
const [user, setUser] = useState({name: "", email: ""});
const [error, setError] = useState("");

const Login = details => {
  console.log(details);

  if(details.email === adminUser.email && details.password === adminUser.password){
    setUser({
      name: details.name,
      email: details.email
    });


  } 
  else{
    setError('Please input your username and password correctly.');
  }
}
  return ( 
    <AuthProvider>
    <div className="App">
    {(user.email !== "") ? (
    <div className="welcome">
      
   
          <Router>
              <Navbar />
              
                <Switch>
                  <Route path='/barangaymap' exact component={Map}/>
                    <Route path='/history' component={History}/>
                     <Route path='/create' component={Create}/>
                    <Route path='/reset' component={Reset}/>
                    <Map/>
                </Switch>
            </Router>
            
      </div>
    ) : (
    <LoginForm Login={Login} error={error} />
    )}
    </div>
{/*  
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        {/* <div className="w-100" style={{maxWidth:"400px"}}>
        <Signup/>
</div> */}
   {/* <div className="w-100" style={{maxWidth:"400px"}}>
        <Reset/>
        </div> */}
{/* 
        <div className="w-100" style={{maxWidth:"400px"}}>
        <History/>
        </div> 
        <div className="w-100" style={{maxWidth:"400px"}}>
        <Map/>
        </div>
      </Container>
      */}
    </AuthProvider>

  
  )
}


export default App;






