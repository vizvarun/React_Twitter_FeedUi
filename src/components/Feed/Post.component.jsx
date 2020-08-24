import { Avatar } from '@material-ui/core'
import React from 'react'
import { Dropdown, postFooterIcons, VerifiedUserIcon } from '../commons/Icons'
import './Post.css'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      cursor:'pointer',
    },
  }));
const Post = React.forwardRef(({userAvatar,
    posterName,
    hashtags,
    userName,
    describe,
    postSrc,
    verified,
    commentNo,
    reTweetNo,
    Click,
    loveNo},ref) => {
    const ImageRef = React.useRef(null);
    const CounterRef = React.useRef(null);
    const [PostType,setPost] = React.useState(null);
    const classes = useStyles();
    const RandomTimers  = {
        PostTimers : Math.floor(Math.random()*100000000),
        timeStamps : Math.floor((Math.random()*23)+1)
    }
    React.useEffect(() => {
        if(ImageRef.current.src.endsWith('.gif')){
            setPost(<h5 style={{
                background : 'black',
                width: 'max-content',
                color: "white",
                padding: '0.1rem 0.3rem',
                borderRadius: '0.3rem'
            }}>GIF</h5>)
        }
        else{
            setPost(null)
        }
    },[])
    const [mathCounter,setCounter] = React.useState({
        comment : commentNo,
        reTweet : reTweetNo,
        love : loveNo
    })
    React.useEffect(() => {
        setInterval(() => {
            setCounter(prevState =>{
                return{
                    comment : prevState.comment + 1
                }
            })    
        },RandomTimers.PostTimers);  
        
        return(() =>{
            clearInterval(setCounter)
        })
    },[RandomTimers.PostTimers])
    const FooterIcos = [];
    for(let key of Object.keys(postFooterIcons))
    {
    FooterIcos.push(
        <h5 className="Post_footer--item" key={key} ref={CounterRef}>
           {postFooterIcons[key]}&nbsp;&nbsp;{key === 'share'?" ": mathCounter.comment}
        </h5>
    )}
    return (
        <div className="Post" ref={ref} onClick={Click}>
            <div className="Post_avatar">
                <Avatar src={userAvatar} alt="Blah" className={classes.large}/>
            </div>
            <div className="Post_body">
                <div className="Post_header">
                    <div className="Post_headerText">
                        <h4>{posterName}{" "}
                            <span className="Post_header--info">
                                {verified ? <VerifiedUserIcon/> : null }
                                {' '}@{userName}&nbsp;&nbsp;&nbsp;&nbsp;&middot;
                                <span className="Post_header--info_timeStamps">{RandomTimers.timeStamps}h</span>
                            </span>
                        </h4>
                        <div className="Post_headerText--dropDown"><Dropdown width={'1rem'}/></div>
                    </div>
                    <div className="Post_headDesc">
                        <p>{describe}</p>
                    </div>
                    <p className="HashTags" style={{color : 'var(--twitter-def-col'}}>{hashtags}</p>
                </div>
                <div className="Post_item">
                    {postSrc?<img
                    ref={ImageRef}
                    src={postSrc}
                    width="500"
                    alt="post" /> : null}
                    {PostType}
                </div>
                <div className="Post_footer">
                    {FooterIcos}
                </div> 
            </div>
        </div>
    )
})

export default Post






