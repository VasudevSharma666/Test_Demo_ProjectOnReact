import React,{useReducer} from 'react'
import './Form.css'
import { Redirect } from 'react-router-dom'
import {Button,Label,Input,FormGroup,Form}  from 'reactstrap'

 const initialState={
    first_name : "" ,
    last_name :  "" ,
    email : "",
    password : "",
    singup : false
}
const reducer =(state,action)=>{
  switch(action.type){
      case "first_name":{
          return{...state,first_name : action.value}
      }
      case "last_name":{
        return{...state,last_name : action.value}
    }
    case "email":{
        return{...state,email : action.value}
    }
    case "password" :{
      return{...state,password : action.value}
    }
    case "singup":{
      return{...state,singup : action.value}
    }
    default:{

    }
  }
}
function Regestation() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const SubmitAbout=(e)=>{
        e.preventDefault();
        if(state.email.match('@')&&state.email.match('.com'))
        {console.log("Registed" + state.first_name+'--'+state.last_name+'---'+state.email+"--"+state.password)
          fetch(`http://localhost:3000/users?email=${state.email}`)
          .then((response) => response.json())
          .then(json=>{if(json.length!==0){
            console.log(json) 
            alert("email is already in use")
         }
          else{
            fetch('http://localhost:3000/users', {
              method: 'POST',
            body: JSON.stringify({
            email : state.email,
            first_name: state.first_name,
            last_name: state.last_name,
            password : state.password
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          })
        .then((response) => response.json())
        .then((json) => alert("you Data is save"),dispatch({type : "singup", value : !state.singup}))
        .catch((error)=> console.log("Somthing is incorrect , try after some  time "))
         
         

          }
        })
       
     }
        else{
          alert("email is invaled")
        }

      }
      

    if(state.singup){
      return(<Redirect to="/"/>)
    }
    else
    {return (
        <div className="wrapperRegistration">
        <Form onSubmit={SubmitAbout} className="Registration-from ">
        <FormGroup>
        <Label>First Name</Label>
        <Input type="text"  value={state.first_name} onChange={e=>dispatch({type : "first_name" ,value : e.target.value})} required className="fadeIn second"/>
        </FormGroup>
        <FormGroup>
        <Label>Last Name</Label>
        <Input type="text" value={state.last_name} onChange={e=>dispatch({type : "last_name" ,value : e.target.value})} required className="fadeIn second"/>
        </FormGroup>
        <FormGroup>
        <Label>Email   </Label>
        <Input type="text" value={state.email} onChange={e=>dispatch({type : "email" ,value : e.target.value})} required className="fadeIn second"/>
        </FormGroup>
        <FormGroup>
        <Label>Password</Label>
        <Input type="password" value={state.password} onChange={e=>dispatch({type : "password" ,value : e.target.value})} required className="fadeIn second"/>
        </FormGroup>
        <Button type="submit" className="btn-lg btn-dark btn-block ">Submit</Button>
        </Form>
        </div>
    )}
}

export default Regestation

