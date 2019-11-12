import React, { useState, useEffect } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const initialForm = {
  username: '',
  password: '',
};

function SignUp(props) {
    debugger
  const [signUpForm, setSignUpForm] = useState(initialForm);

  const isDisabled = () => {
    return !signUpForm.username || !signUpForm.password;
  }

  const onFormInput = e => {
    setSignUpForm({...signUpForm, [e.target.id]: e.target.value});
  }

  const addUser = e => {
    e.preventDefault();
    const newUser = {
      username: signUpForm.username,
      password: signUpForm.password,
    }
    axios.post('http://localhost:4000/api/auth/register', newUser)
      .then(res => {
        console.log(res)
        debugger
        props.history.push('/login')
      })
      .catch(err => {
        console.log(err)
        debugger
      })
    setSignUpForm(initialForm);
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={addUser}>
          <label htmlFor="username">Username</label>
          <input onChange={onFormInput} maxLength={50} value={signUpForm.username} id='username' type='text' />

          <label htmlFor="password">Password</label>
          <input onChange={onFormInput} value={signUpForm.password} id='password' type='password' />

          <button disabled={isDisabled()}>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default SignUp;
