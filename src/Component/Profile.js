import React from 'react'
import  {Button,Form,Input,FormGroup, Label} from 'reactstrap'
import { Link } from 'react-router-dom'

function Profile() {
    const email = localStorage.getItem("email")
    const img = localStorage.getItem("img")
    const name = localStorage.getItem("name")
    return (
        <div className="PersonData">
           <img src={img}/>
           <br/>
           <Label>Name</Label>
           <Input type="text" value={name} readonly /> 
           <br/>
           <Label>Email</Label>
           <Input  type="text" value={email} readonly/>
           <br/>
          <Link to="/home">Back</Link>
        </div>
    )
}

export default Profile
