import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth'
import {auth} from '../firebase'
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }
    const logOut = () => {
        signOut(auth);
    }
    const postUser = async (signedUser) => {
        const newUser = {
            uid: signedUser.uid,
            avatar: signedUser.photoURL,
            email: signedUser.email,
            name: signedUser.displayName,
            role: 2
        }
        await axios.post('http://localhost:5000/api/auth', newUser)
                .then(response => console.log(response))
                .catch(e=>console.log(e))
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
            postUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    },[])
    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(AuthContext);
}