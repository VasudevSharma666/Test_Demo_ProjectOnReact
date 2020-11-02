import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Demo from './Component/Demo'
import Registration from './Component/Regestation'
import HomePage from './Component/HomePage'

import CommentOnThePost from './Component/CommantOnThePost'
import Logout from './Component/Logout'
import NewPost from './Component/NewPost'
import Profile from './Component/Profile'
import OtherPosts from './Component/OtherPosts'



function MainFile() {
    return (
        <div>
           <h1 align="center" className="Facebook">Facebook</h1>
           <br/>
            <Switch>
             <Route exact path='/' component={Demo}/>
             <Route  path="/Registration" component={Registration}/>
             <Route exact path="/home" component={HomePage}/>
             <Route  exact path="/home/NewPost" component={NewPost}/>
             <Route path="/CommentOnPost" component={CommentOnThePost}/>
             <Route exact path='/logout' component={Logout}/>
             <Route exact path="/home/ProfileOfUser" component={Profile} />
             <Route exact path="/home/OtherPost" component={OtherPosts} />
             
            </Switch>
        </div>
    )
}

export default MainFile;
