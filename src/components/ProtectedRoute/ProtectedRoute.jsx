import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRouteElement ({ element: Component, ...props  }) {
    //console.log('ProtectedRouteElement ', props);
    const location= useLocation();
    const last=localStorage.getItem('lastPath');
    //console.log('location ', location);
    localStorage.setItem('last',last)
  return (
  
   (props.authorizedUser /* || token */) ?  <Component {...props} />  : <Navigate to="/" replace state={{from: location}}/>
)
}

export default ProtectedRouteElement;