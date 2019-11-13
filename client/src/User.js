import React, { useState, useEffect } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function User(props) {
    debugger

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:4000/api/users')
        .then(res => {
          console.log(res)
          debugger
        })
        .catch(err => {
          console.log(err)
          debugger
        })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {userDetails.map(user => (
              user.username
          ))}
        </div>
      </header>
    </div>
  );
}

export default User;
