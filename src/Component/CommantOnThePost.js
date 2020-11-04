import React,{useEffect,useReducer} from 'react'
import { useLocation,Link } from 'react-router-dom'
import * as ReactBoot from 'reactstrap'
const initialState={
   posts : [],
   comment : [],
   todoComment : ''
}

const reducer=(state,action)=>{
 switch(action.type){
     case "posts":{
         return{...state,posts : action.value}
     }
     case "Comments":{
         return{...state,comment : action.value}
     }
     case "NewComment" :{
         return{...state,todoComment : action.value}
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

 const DeletedTheComment=(e)=>{
     
    fetch('http://localhost:3000/comments/'+e.target.id, {
        method: 'DELETE',
              })
              window.location.reload(false);
 }

 const ShowTheComments=()=>{
       return(<React.Fragment>
        {
            state.comment.map(comment=><p key={comment.id} className="divposts">
                <span>email:-</span>    {comment.email}
                <br/>
                <span>Comment:-</span>    {comment.body}
                <br/>
                <input type="image" id={comment.id} onClick={e=>DeletedTheComment(e)}  src="https://www.flaticon.com/svg/static/icons/svg/3159/3159662.svg" width="20" height="30"/>
                 </p>)
        }
        </React.Fragment>)
 }

 const SubmitTheComment=(e)=>{
    e.preventDefault();

    console.log("It working")
    fetch('http://localhost:3000/comments', {
  method: 'POST',
  body: JSON.stringify({
    postId: postId,
    email : localStorage.getItem("email"),
    body : state.todoComment,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => alert("Your comment is save"))
  window.location.reload(false);
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
        <hr/>
        <div className="NewCommentAdder">
        <ReactBoot.Form onSubmit={SubmitTheComment}>
         <ReactBoot.Label>Comment</ReactBoot.Label>
         <ReactBoot.Input type="text"  value={state.todoComment} onChange={e=>{dispatch({type : "NewComment" , value : e.target.value})}} placeholder="Comment" />
         <ReactBoot.Button type="submit">Submit</ReactBoot.Button>
         </ReactBoot.Form>
         </div>
        </div>
    )

}

export default CommentOnThePost
