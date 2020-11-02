import React, { useReducer } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {Button,Form,Input,FormGroup,Label} from 'reactstrap'

const initialState={
todoTitle : "",
todoBody  : "",
todopostCompleted : false
}
const reducer=(state,action)=>{
    switch(action.type){
     case  "Title":{
         return{...state,todoTitle : action.value}
     }
     case "Body":{
        return{...state,todoBody : action.value}
     }
     case "postCompleted":{
         return{...state,todopostCompleted : action.value}
     }
     default:{
       return{...state}
     } 
    }
}

function NewPost() {
    const name=localStorage.getItem("name")
    const userID=localStorage.getItem("userData")
    const [state, dispatch] = useReducer(reducer, initialState)
    const SubmitTheNewPost=(e)=>{
        e.preventDefault();
        console.log("new somthing is call"+state.todoBody+"-"+state.todoTitle)
         fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: state.todoTitle,
        body: state.todoBody,
        userId: userID,
       }),
      headers: {
     'Content-type': 'application/json; charset=UTF-8',
     },
    })
  .then((response) => response.json())
  .then((json) => alert("Your Post is save"))
  .catch(err=>alert("error, Try again"))
  dispatch({type : "postCompleted" , value : true})
    }
    if(state.todopostCompleted){
       return(<Redirect to="/home"/>)
    }
    else
    {return (
        <div className="NewPostMaker">
       
       <Form onSubmit={SubmitTheNewPost} className="NewPostMakerForm">
       <FormGroup>
       From :-<h2>{name}</h2> 
       </FormGroup>
       <FormGroup>
            <Label>Title</Label>
            <Input type="text" value={state.todoTitle} onChange={e=>dispatch({type : "Title" ,value : e.target.value})} required  placeholder="Subject"/>
            </FormGroup>
            <FormGroup>
            <Label>Body</Label>
            <Input  className="postBody" value={state.todoBody} onChange={e=>dispatch({type : "Body" ,value : e.target.value})} required placeholder="body" />
            </FormGroup>
            <FormGroup>
            <Button type="submit" className="btn-lg btn-dark ">Submit</Button>
            </FormGroup>
            <Link to="/home">Back</Link>
            </Form>
 
        </div>
    )}
}

export default NewPost
