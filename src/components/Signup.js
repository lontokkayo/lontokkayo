import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert, DropdownButton, Dropdown} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc } from "firebase/firestore"
import { db, auth } from "../firebase"
import UI from '../icon/addacount.PNG';
import * as FaIcons from "react-icons/fa";
import '../cssPages/Signup.css';
import Back from '../background/background.PNG';


export default function Signup() {
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const dropdownRef = useRef()
const {signup, currentUser} = useAuth()
const [error, setError] = useState("")
const [accountType, setAccountType] = useState("resident")
const [success, setSuccess] = useState("")
const [loading, setLoading] = useState(false)
const userId = currentUser && currentUser.uid

async function handleSubmit(e){
    e.preventDefault()

    var passwordText = passwordRef.current.value
    var passwordLength = passwordText.length
    var emailText = emailRef.current.value
    var emailLength = emailText.length
    var passwordConfirmText = passwordConfirmRef.current.value
    var passwordConfirmLength = passwordConfirmText.length

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
        

        return setError('Passwords do not match')
        
    }

    if(passwordLength > 0 || passwordConfirmLength  > 0){
        if(passwordLength <= 6 || passwordConfirmLength <= 6 ){
            setSuccess('')
            setError('')
            return setError('Password must be more than 6 characters')
        }

    }

    if(emailLength > 6){
        if(emailRef.current.value !== '' && (passwordRef.current.value === '' && passwordConfirmRef.current.value === '')){
            passwordRef.current.value = emailRef.current.value
            passwordConfirmRef.current.value = emailRef.current.value
    
        }  
        
    }
    else{
        setSuccess('')
        setError('')
        return setError('Email must be more than 6 characters') 
        
    }

    try{
        setError('')
        setSuccess('')
        setLoading(true)
        await signup(emailRef.current.value + '@navotas.ph', passwordRef.current.value)

        setSuccess('Account has been added successfully')

        await setDoc(doc(db, "account_info", emailRef.current.value + '@navotas.ph'), {
            account_type: accountType,
            email:  emailRef.current.value + '@navotas.ph',
            password: passwordRef.current.value
            }); 

        emailRef.current.value = ''
        passwordRef.current.value = ''
        passwordConfirmRef.current.value = ''     

    }
     catch{
        setError('Failed to create an account, account may already existed or internet error')
    }
    setLoading(false)
}

    return (
       <>

           {/*} <h2 className="text-center mb-4">Create Account</h2>*/}
        <div className="sign">
        <br/><br/>

            <Form onSubmit={handleSubmit} className="create-account">
   

                <div className="iRM">
                  <img src={UI} alt="logo" style={{margin:'0% auto',display:'flex',width:'20%'}}/>
                   <h1 className="text-center" style={{marginBottom:'50px',padding:'20px'}}> Create Account </h1>
                     {error && <Alert variant="danger">{error}</Alert>} {success && <Alert variant="success">{success}</Alert>}
                </div>

                <Form.Group id="text">
                    <label style={{marginRight:'5px'}}><FaIcons.FaUserAlt /></label>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type ="text" placeholder="Email@navotas.ph" style={{padding:'10px',borderRadius:'6px'}} ref={emailRef} required /> 
                    <Form.Label style={{color:'rgba(17, 17, 17, 0.5)'}}>@navotas.ph</Form.Label>
                </Form.Group>

                <Form.Group id="password" style={{float:'left',width:'45%'}}>
                <label style={{marginRight:'5px',marginTop:'2%'}}><FaIcons.FaLock /></label>
                    <Form.Label >Password</Form.Label>
                    <Form.Control type ="password" style={{padding:'10px',borderRadius:'6px'}}  placeholder="Password" ref={passwordRef}  />
                </Form.Group>

                <Form.Group id="password-confirm" style={{float:'right',width:'45%'}} >
                    <label style={{marginRight:'5px',marginTop:'2%'}}><FaIcons.FaLock /></label>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type ="password" style={{padding:'10px',borderRadius:'6px'}} placeholder="Confirm Password" ref={passwordConfirmRef}  />
                </Form.Group>

                <Form.Group>
                <Form.Label style={{marginTop:'5%', marginRight:'10px',marginBottom:'40px', letterSpacing:'1px'}}>Choose Account Type:   </Form.Label>
                <select className="custom-select" style={{borderRadius:'6px'}} onChange={(e)=> {
                    const selectedAccountType = e.target.value;
                    setAccountType(selectedAccountType)
                }}>       
                        <option value="resident">Resident</option>
                        <option value="officer">Officer</option>
                </select>
                
                <Form.Label></Form.Label>
                </Form.Group>
               
                <Button disabled={loading} className="w-100 text-center mt-2"
                id="btnn" type="submit">Create Account</Button>



            </Form>

            </div>
     </>
    )
}

