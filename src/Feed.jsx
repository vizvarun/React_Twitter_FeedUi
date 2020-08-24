import { IconButton } from '@material-ui/core'
import React from 'react'
import { TweetFirst,userPostsIcons } from './components/commons/Icons'
import Post from './components/Feed/Post.component'
import Tweetbox from './components/Feed/Tweetbox.component'
import './Feed.css'
import db from './firebase/firebase.config'
const Feed = () => {
   const [posts,setPost] = React.useState([]);
   React.useEffect(() =>{
      db.collection('Posts').onSnapshot(snapShot =>{
        setPost(snapShot.docs.map(docs => {
            return {
                ...docs.data(),
                id : docs.id
            }
        }))
      })
   },[])
   const PostRef = React.useRef(null);
    return (
        <div className="Feed">
           <div className="Feed_header">
                <div className="Feed_header--container">
                    <h2>Home</h2>
                    <IconButton>{TweetFirst}</IconButton>
                </div>
           </div>
           <Tweetbox />
            {
               posts.map(post => {
                return <Post
                ref={PostRef}
                Click
                key={post.id}
                userAvatar={post.userAvatar}
                posterName={post.posterName}
                userName={post.userName}
                postSrc={post.postSrc}
                describe={post.describe}
                hashtags={post.hashtags}
                verified={post.verified}
                commentNo={Math.floor(Math.random()*1000)}
                reTweetNo={Math.floor(Math.random()*700)}
                loveNo={Math.floor(Math.random()*3000)}
                /> 
               })
            }
        </div>
    )
}

export default Feed
