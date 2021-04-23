import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// render a Route component
// take in all of the sam eprops as a regular Route comp
// check to see if user is authenticated

//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route 
      {...rest} 
      render={() => {
        if (window.localStorage.getItem('token')){
          return <Component />;
        } else {
          console.log('Redirecting...');
          return <Redirect to='/login' />;
        }
      }}
    />)
  
}

export default PrivateRoute