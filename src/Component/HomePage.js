import React, { useReducer,useEffect } from 'react'
import { Redirect,Link } from 'react-router-dom';
import * as ReactBoot from 'reactstrap'
import { Navbar } from 'reactstrap';
import  "./Form.css"
import Deleted from './Deleted';
var commt=""
const  initialState={
 name : "",
 posts: [],
 gotocomment : false,
  PostsLen : false
}
const reducer=(state,action)=>{
switch(action.type){
   case "name":{
       return{...state,name : action.value}
   }
   case "posts":{
       return{...state,posts : action.value}
   }
   case "PostsLen":{
       return{...state,PostsLen : action.value}
   }
   default:{

   }
}
}
function HomePage() {
      const [state, dispatch] = useReducer(reducer, initialState)
    const UserData = localStorage.getItem("userData");

    useEffect(() => {
        console.log(UserData)
        console.log(localStorage.getItem("name"))
        dispatch({type : "name", value : localStorage.getItem("name")})
         fetch('http://localhost:3000/posts?userId='+UserData)
        .then((response) => response.json())
        .then((json) => dispatch({type : "posts" ,value : json }))
        
    }, [])
 
   const DeletedThePost=(e)=>{
       console.log(e.target.id)
       fetch('http://localhost:3000/posts/'+e.target.id, {
  method: 'DELETE',
        })
        window.location.reload(false);
   }

   const ShowTheData  =()=>{ 
     console.log(state.posts)
     return(<React.Fragment>
        {
            state.posts.map(post=><div  key={post.id}><div    className="PostsTag" >
                <p hidden>{commt ="/CommentOnPost/"+post.id}</p>
                 <h3> <span>-:Title:-</span> <br/> {post.title}</h3> 
                 <h3> <span>-:Body:-</span> <br/> {post.body}</h3> 
                 <Link id={post.id} to={commt} className="LinkToComment" >See The Comment</Link>
                  <input type="image" id={post.id} onClick={e=>DeletedThePost(e)}  src="https://www.flaticon.com/svg/static/icons/svg/3159/3159662.svg" width="20" height="30"/>
                 <br/>
                </div>
                <br/>
                </div>
                )
        }
        <br/>
        </React.Fragment>)
   }
  const NullPosts=()=>{
      setTimeout(()=>{dispatch({type : "PostsLen",value : true})},3000)
      if(state.PostsLen){
          return(<div className="NoPosts"> No Posts available</div>)
      }else{
          return(<ReactBoot.Spinner />)
      }
  }

   if(UserData===null){
       alert("login first")
       return(<Redirect to="/"/>)
   }
   else{
    return (
        <React.Fragment  >
        <div className="HomePageBackground">
          <Navbar className="Navbar" style={{ backgroundColor  : "white" ,border : "2px solid gray"}}  >
            <h2 className="NameOfPerson">Mr.{state.name} </h2> 
             <Link to="/logout" align="right ">Logout</Link>
        </Navbar>
         <div className="OtherLink">
          <Link to="/home/ProfileOfUser">Profile</Link>
          <hr/>
          <Link to="/home/NewPost">New Post</Link>
          <hr/>
          <Link to="/home/OtherPost">See Other Post</Link>
          <hr/>
         </div>
         
         
         <div className="StartPoint">{state.posts.length>0 ? <ShowTheData/>:<NullPosts />}</div>
         </div>
        </React.Fragment>
    )}
}

export default HomePage
