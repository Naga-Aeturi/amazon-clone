import React, { useState } from 'react';
import './Register.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { db } from './firebase';

function Register() {
    const navigator = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');

    const register = e => {
        e.preventDefault();
        if(password === confirmPassword)
        {
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const uid = userCredential.uid;
                db.collection('users').doc(uid).set({
                    username: name,
                    email: email,
                    address: address,
                    password: password
                });
                if (auth)
                {
                    navigator('/')
                }
            })
            .catch(error => 
                alert(error.message)
            )
        }
    }

    return (
        <div className='Register'>
            <Link to='/'>
                <img
                    className='amazon_logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='register-box'>
                <h1>Create New Account</h1>

                <form>
                    <h2>E-mail</h2>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: '20px' }}/>
                    <h2>User Name</h2>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} style={{ fontSize: '20px' }}/>
                    <h2>Password</h2>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} style={{ fontSize: '20px' }}/>
                    <h2>Confirm Password</h2>
                    <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ fontSize: '20px' }}/>
                    <h2>Address</h2>
                    <input type='address' value={address} onChange={e => setAddress(e.target.value)} style={{ fontSize: '20px' }}/>
                    <button onClick={register} className='registerButton'>Create your Amazon Account</button>
                </form>
                
            </div>
        </div>
    )
}

export default Register