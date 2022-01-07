import React from 'react';
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

import "./Login.css";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

    // dispatch is like a gun => shoot to the data layout
    const [{ }, dispatch] = useStateValue();

    // enable sign in thorugh Google
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result) 
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                });
            }).catch((error) => {
                alert(error.message)
            });
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__text'>
                    <h1>Birdy</h1>
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
