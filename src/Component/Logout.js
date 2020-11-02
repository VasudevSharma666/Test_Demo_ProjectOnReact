import React from 'react'
import { Redirect } from 'react-router-dom'

function Logout() {
     localStorage.removeItem("userData")
     localStorage.removeItem("name")
    return (<Redirect to="/"/>)
}

export default Logout
