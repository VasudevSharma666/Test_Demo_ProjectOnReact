import React,{useEffect,useReducer} from 'react'
import { useLocation,Link } from 'react-router-dom'
import * as ReactBoot from 'reactstrap'
const initialState={
   posts : [],
   comment : []
}

const reducer=(state,action)=>{
 switch(action.type){
     case "posts":{
         return{...state,posts : action.value}
     }
     case "Comments":{
         return{...state,comment : action.value}
     }
     default:{

     }
 }
}

function CommentOnThePost() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const location = useLocation();
    const postId = (location.pathname.match(/(\d+)/)[0]).toString()
     console.log("show the Data"+state.posts.length)
    useEffect(() => {
        
       fetch(`http://localhost:3000/posts/${postId}`)
        .then(res=>res.json())
        .then(json=>dispatch({type : "posts" , value : json}))
        .catch(err=>alert("something is error in post"+err))
        console.log(state.posts)
        
       fetch(`http://localhost:3000/comments?postId=${postId}`)
        .then(res=>res.json())
        .then(json=>dispatch({type : "Comments" , value : json}))
        .catch(err=>alert("something is error in Comments"+err))
    },[])
 const ShowThePost=()=>{
     
     return(<React.Fragment>
        <div>
        <div id={state.posts.id}  className="divposts" >
                 <h3> <span>-:Title:-</span> <br/> {state.posts.title}</h3> 
                 <h3> <span>-:Body:-</span> <br/> {state.posts.body}</h3> 
            </div>
        </div>
        </React.Fragment>)
 }

 const ShowTheComments=()=>{
       return(<React.Fragment>
        {
            state.comment.map(comment=><p key={comment.id} className="divposts">
                <span>email:-</span>    {comment.email}
                <br/>
                <span>Comment:-</span>    {comment.body}
                 </p>)
        }
        </React.Fragment>)
 }
    return (
        <div className="StartPointOfComment">
       <ShowThePost/>
        <br/>
        <h2 className="Comment">Comments </h2>
        <hr/>
        <br/>
        
        <ShowTheComments/>
        <Link to="/home">Back</Link>
        </div>
    )

}

export default CommentOnThePost
