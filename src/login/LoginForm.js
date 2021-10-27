import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import '../login/LoginForm.css';
import * as FaIcons from "react-icons/fa";
import Logo from '../icon/NBBS LOGO.PNG';
import irm from '../icon/landscapeSys.png';
import Back from '../background/Picture21.PNG';
import {Form, Button} from 'react-bootstrap';


/*Function*/
function LoginForm({Login, error}) {
    const [details, setdetails] = useState({email: "", password: ""});
    const submitHandle = e => {
        e.preventDefault();
        Login(details);
    }
    return (
        <div>

        <Form onSubmit={submitHandle}> 
{/*Content*/} 
            <div className="background"/>  
                 <div className="form-inner">
                    
{/*Header */}
                    <h1 className="Title-form">
{/*Logo and Title */}
                     <img src={Logo} alt="nbbs" style={{width:'6vmin',marginRight:'10px'}}/>
                      Barangay NBBS Dagat-Dagatan</h1>     
{/*Picture*/}
            <Form.Group className="Photo">
                <>
                    <img src={Back} className="image-side" alt="nbbs"/>
                </>
            </Form.Group>

               
{/*Login form*/}
{/*IRM Logo*/}
                <Form.Group className="Login-form">
                    <Form.Group>
                            <img src={irm} alt="nbbs" style={{width:'20vmax',margin:'0% auto'}}/>
                            <br/><br/>
                             {error && <Alert variant="danger">{error}</Alert>}
                    </Form.Group>
{/*Login form username */}
                    <Form.Group style={{marginTop:'5%'}}>
                            <Form.Label><FaIcons.FaUserAlt /><label style={{fontSize:'11px',marginLeft:'2px'}}>Username</label></Form.Label>
                            <Form.Control type="text" className="w-100" name="email" id="form-email" placeholder="Username" 
                            onChange={e =>setdetails({...details, email: e.target.value})} value={details.email} required/>
                    </Form.Group>
{/*Login form password */}
                        <Form.Group style={{marginTop:'5%'}}>
                            <Form.Label ><FaIcons.FaLock /><label style={{fontSize:'11px',marginLeft:'2px'}}>Password</label></Form.Label>
                            <Form.Control type="password" className="w-100" name="password" id="form-password" placeholder="Password" 
                            onChange={e =>setdetails({...details, password: e.target.value})} value={details.password} required />
                        </Form.Group>
{/*Login button */}
                            <Button type="submit" id="Login-btn" className="w-100">LOGIN</Button>
                    </Form.Group>
                </div>
        </Form>
  
    </div>
    )
}

export default LoginForm;
