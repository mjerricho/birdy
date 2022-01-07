import React from 'react';
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import "./Login.css";

function Login() {
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__text'>
                    Please log in through Google
                </div>
                <Button type="submit" onClick={signIn}>
                    Let's Fly
                </Button>
            </div>
        </div>
    )
}

export default Login