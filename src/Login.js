import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
    const navigator=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth)navigator('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        navigator('/Register')
        // auth.createUserWithEmailAndPassword(email, password)
        //     .then((auth) => {
        //         if (auth)navigator('/')
        //     })
        //     .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='amazon_logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
                    alt=''
                />
            </Link>

            <div className='box'>
                <h1>Sign In</h1>

                <form>
                    <h2>E-mail</h2>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: '20px' }}/>

                    <h2>Password</h2>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} style={{ fontSize: '20px' }}/>

                    <button type='submit' onClick={signIn} className='signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login