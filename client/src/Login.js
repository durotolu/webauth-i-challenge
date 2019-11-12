import React, { useState, useEffect } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const initialForm = {
  username: '',
  password: '',
};

function Login(props) {
    debugger
  const [loginForm, setLoginForm] = useState(initialForm);

  const isDisabled = () => {
    return !loginForm.username || !loginForm.password;
  }

  const onFormInput = e => {
    setLoginForm({...loginForm, [e.target.id]: e.target.value});
  }

  const addUser = e => {
    e.preventDefault();
    const loginInfo = {
      username: loginForm.username,
      password: loginForm.password,
    }
    axios.post('http://localhost:4000/api/auth/login', loginInfo)
      .then(res => {
        console.log(res)
        debugger
        props.history.push('/user')
      })
      .catch(err => {
        console.log(err)
        debugger
      })
    setLoginForm(initialForm);
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={addUser}>
          <label htmlFor="username">Username</label>
          <input onChange={onFormInput} maxLength={50} value={loginForm.username} id='username' type='text' />

          <label htmlFor="password">Password</label>
          <input onChange={onFormInput} value={loginForm.password} id='password' type='password' />

          <button disabled={isDisabled()}>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
