import { Avatar } from '@material-ui/core'
import React  from 'react'
import { TweetFirst } from '../components/commons/Icons'
import { DeleteModal,useWindowResizer } from '../components/commons/Ui'
import Post from '../components/Feed/Post.component'
import Tweetbox from '../components/Feed/Tweetbox.component'
import './Feed.css'
import db from '../firebase/firebase.config'
import AccountPic from '../static/images/Accountpic.webp'
import { drawerContext } from '../contexts/sideDrawer'
import { FIRST_BREAK_POINT } from '../components/commons/Breakpoints'
const Feed = ({ToggleDrawer}) => {
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
   },[]);
   const { ModalOpen,CloseModal,postID } = React.useContext(drawerContext)
   const Deletehandler = (id) => {
       db.collection('Posts').doc(id).delete();
       CloseModal();
   }
   const [width] = useWindowResizer()
   const PostRef = React.useRef(null);
   const Randomize = React.useCallback((number) => {
        return Math.floor(Math.random()*number)
   },[])
   console.log('Feed Rendered')
    return (
        <div className="Feed">
           <div className="Feed_header">
                <div className="Feed_header--container">
                    {width < FIRST_BREAK_POINT ? <div 
                    onClick={ToggleDrawer} 
                    style={{cursor:'pointer'}}><Avatar src={AccountPic} alt=""/></div>: null}
                    <h2>Home</h2>
                    <div className="Header-svg">{TweetFirst}</div>
                </div>
           </div>
           {width > FIRST_BREAK_POINT ? <Tweetbox /> : null}
            {
               posts.map(post => {
                return <Post
                ref={PostRef}
                key={post.id}
                getID={post.id}
                userAvatar={post.userAvatar}
                posterName={post.posterName}
                userName={post.userName}
                postSrc={post.postSrc}
                describe={post.describe}
                hashtags={post.hashtags}
                verified={post.verified}
                commentNo={Randomize(1000)}
                reTweetNo={Randomize(700)}
                loveNo={Randomize(3000)}
                /> 
               })
            }
            <DeleteModal 
            Open={ModalOpen}
            DeleteTweet={() => Deletehandler(postID)}
            ModalClose={CloseModal}/>
        </div>
    )
}

export default Feed

