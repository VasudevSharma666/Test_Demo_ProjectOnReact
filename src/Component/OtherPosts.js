import React,{useEffect,useState,useReducer } from 'react'
import {Link} from 'react-router-dom'
import { Navbar } from 'reactstrap'
var Comment =""
const initialState={
todoPosts : [],
todoUser : []
}

const reducer=(state,action)=>{
    switch(action.type){
      case "Post":{
          return{...state,todoPosts : action.value}
      }
      case "User":{
           return{...state,todoUser : action.value}
      }
      default:{
          return{...state}
      }
    }
}
function OtherPosts() {
 const [state, dispatch] = useReducer(reducer, initialState)
 useEffect(()=>{
    fetch('http://localhost:3000/posts')
    .then((response) => response.json())
    .then((json) => dispatch({type : "Post" , value : json}))
    .catch(err=>alert("Something is error"+err))
    
 },[])





 const ShowTheData  =()=>{ 
    return(<React.Fragment>
       {
           state.todoPosts.map(post=><div  key={post.id}><div    className="PostsTag" >
               <h3>UserID{post.userId}</h3> 
               <p hidden>{Comment ="/CommentOnPost/"+post.id}</p>
                <h3> <span>-:Title:-</span> <br/> {post.title}</h3> 
                <h3> <span>-:Body:-</span> <br/> {post.body}</h3> 
                <Link id={post.id} to={Comment} className="LinkToComment" >See The Comment</Link>
                 <br/>
               </div>
                <br/>
               </div>
               )
       }
       <br/>
       </React.Fragment>)
  }
 console.log("User"+state.todoUser)
    return (
        <div>
        <Navbar>
        <Link to="/home" className="DeletedImg">Back</Link>
        </Navbar>
            
            <div className="StartPoint">{state.todoPosts.length>0 ? <ShowTheData/>:null}</div>
          
        </div>
    )
}

export default OtherPosts
