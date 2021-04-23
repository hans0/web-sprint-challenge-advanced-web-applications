import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    if(localStorage.getItem('token')){
      props.history.push('/bubbles');
    }
  });
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    console.log(credentials);
  }
  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem('token', JSON.stringify(res.data.payload));
        props.history.push('/bubbles')
      })
      .catch((err) => {
        // console.log(err);        
        // console.log(err.response.data.error);
        setError('Username or Password not valid.');
      })
    
  }

  const [error, setError] = useState("");
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            data-testid="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            data-testid="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.