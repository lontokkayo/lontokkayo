import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)

}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
     return auth.createUserWithEmailAndPassword(email, password)
       
        
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
      }
     
     function logout(){
         return auth.signOut()
     } 

     function resetpassword(defaultPassword){
        return auth.currentUser.updatePassword(defaultPassword)
     }

     function deleteaccount(){
         return auth.currentUser.delete()
     }

        useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)

        })

        return unsubscribe
     }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetpassword,
        deleteaccount

    }

    return (
        <AuthContext.Provider value = {value}>
            { children }
        </AuthContext.Provider>
    )
}
