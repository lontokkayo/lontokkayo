import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { doc, setDoc, getDoc, getDocFromCache, updateDoc, deleteDoc} from "firebase/firestore"
import { db, auth } from "../firebase"
import '../cssPages/Reset.css';
import ResetUI from '../icon/resetaccount.PNG';
import * as FaIcons from "react-icons/fa";




export default function Reset() {
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const dropdownRef = useRef()
const {login, logout, resetpassword, deleteaccount} = useAuth()
const [error, setError] = useState("")
const [defaultPass, setDefaultPass] = useState("")
const [accountType, setAccountType] = useState("resident")
const [success, setSuccess] = useState("")
const [loading, setLoading] = useState(false)


  
async function handleSubmit(e){
    e.preventDefault()


    var emailText = emailRef.current.value
    var emailLength = emailText.length



    // const querySnapshot = await getDocs(collection(db, "account_info", "elainecruz@navotas.ph", "password"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    //   setSuccess(`${doc.id} => ${doc.data()}`)
    // });

    class City {
        constructor (password ) {
            this.password = password;
          
        }
        toString() {
            return this.password;
        }
    }
    
    // Firestore data converter
    const cityConverter = {
        toFirestore: (city) => {
            return {
                password: city.password,
                };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new City(data.password);
            
        }
    };
   
    const ref = doc(db, "account_info", emailText+'@navotas.ph').withConverter(cityConverter);
    const docSnap = await getDoc(ref);
    
    if (docSnap.exists()) {
     
      const city = docSnap.data();
      console.log(city.toString());
    } else {
      console.log("No such document!");
    }        
    try {
        await logout()
    } catch (error) {
        
    }

    try{
 
  
     await login(emailRef.current.value + '@navotas.ph', docSnap.data().toString())
        setDefaultPass(emailRef.current.value)
        setSuccess('Account does exist: ' + emailRef.current.value + '@navotas.ph')
        setError('')
    }
     catch{
        setError('Failed to check account, account may not exist')
        setSuccess('')
    }
    if(emailLength > 6){     
        
    }
    else{
        setSuccess('')
        setError('')
        return setError('Email must be more than 6 characters') 
        
    }
   setLoading(false)
}

async function handleReset(e){
    e.preventDefault()

    var emailText = emailRef.current.value
    var emailLength = emailText.length

    if(defaultPass === ''){
        setSuccess('')
        return setError('Failed to reset password, make sure to search an existing account first')
        
    }

    if(emailLength > 6){
    
    }
    else{
        setSuccess('')
        setError('')
        return setError('Email must be more than 6 characters') 
        
    }

    try {
        await resetpassword(defaultPass); 
        await updateDoc(doc(db, "account_info", defaultPass + '@navotas.ph'), {
            password: defaultPass
            }); 
            setError('')
            setSuccess('Password has been reset')
            setDefaultPass('')
            console.log(defaultPass)
    } catch (error) {
        setError('Failed to reset password, make sure to search an account first')
        setSuccess('')
    }
}

async function handleDelete(e){
    e.preventDefault()

    var emailText = emailRef.current.value
    var emailLength = emailText.length

    if(defaultPass === ''){
        setSuccess('')
        return setError('Failed to delete account, make sure to search an existing account first')
        
    }

    if(emailLength > 6){
    
    }
    else{
        setSuccess('')
        setError('')
        return setError('Email must be more than 6 characters') 
        
    }

    try {
        await deleteaccount()
        await deleteDoc(doc(db, "account_info", emailText+'@navotas.ph'));
            setError('')
            setSuccess('Account has been deleted')
            setDefaultPass('')
            console.log(defaultPass)
    } catch (error) {
        setError('Failed to delete account, make sure to search an account first')
        setSuccess('')
    }
}

    return (
        <>
            
<div className="resets">
            {/*<h2 className="text-center mb-4">Modify Account</h2>*/}

            
<br/><br/><br/>

            
            <Form onSubmit={handleSubmit} className="reset-account">
 
            <div className="reset" >
                <div className="iRM">
                    <img src={ResetUI} alt="logo" style={{margin:'0% auto',display:'flex',width:'20%'}}/>
                   <h1 className="text-center" style={{marginBottom:'50px',padding:'20px'}}> Modify Account </h1>
                    {error && <Alert variant="danger">{error}</Alert>} {success && <Alert variant="success">{success}</Alert>}
                </div>

                <Form.Group id="text" style={{marginBottom:'20px'}}>
                <label style={{marginRight:'5px'}}><FaIcons.FaLock /></label>
                    <Form.Label style={{marginRight:'5px'}}>Email</Form.Label>
                    <Form.Control type ="text" style={{padding:'10px',borderRadius:'6px'}} placeholder="Example: Email@navotas.ph" id="text-box" ref={emailRef} required /> 
                    <Form.Label style={{color:'rgba(17, 17, 17, 0.5)'}}>@navotas.ph</Form.Label>
                </Form.Group>
                
               
                <Button disabled={loading} id="search-acc" className=" text-center mt-2" type="submit">
                    Search Account
                </Button>
 

                <Button disabled={loading} id="reset-acc" className=" text-center  mt-2" onClick={handleReset}> Reset Password </Button>
                <Button disabled={loading} id="delete-acc" className=" text-center  mt-2" onClick={handleDelete}> Delete Account </Button>
                </div>
            </Form>
            </div>
        </>
    )
}

