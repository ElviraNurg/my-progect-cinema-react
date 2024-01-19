import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRouteElement ({ element: Component, ...props  }) {
    //console.log('ProtectedRouteElement ', props);
  return (
  
   props.authorizedUser ?  <Component {...props} />  : <Navigate to="/" replace/>
)
}

export default ProtectedRouteElement;