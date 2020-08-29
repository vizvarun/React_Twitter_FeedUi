import { Avatar } from '@material-ui/core'
import React from 'react'
import { Dropdown, MenuIcons, MenuTweets, postFooterIcons, VerifiedUserIcon } from '../commons/Icons'
import './Post.css'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { drawerContext } from '../../contexts/sideDrawer'
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
    getID,
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
        else if(ImageRef.current === null){
                ImageRef.current.src = "Blah Blah"
                setPost(null)
            }
    },[])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
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
    console.log(React.useContext(drawerContext))
    const FooterIcos = [];
    for(let key of Object.keys(postFooterIcons))
    {
    FooterIcos.push(
        <h5 className="Post_footer--item" key={key} ref={CounterRef}>
           {postFooterIcons[key]}&nbsp;&nbsp;{key === 'share'?" ": mathCounter.comment}
        </h5>
    )}
    console.log('Post rendered')
    const { OpenModal } = React.useContext(drawerContext);
    return (
        <div className="Post" ref={ref}>
            <div className="Post_avatar">
                <Avatar src={userAvatar} alt="Blah" className={classes.large}/>
            </div>
            <div className="Post_body">
                <div className="Post_header">
                    <div className="Post_headerText">
                        <h4>{posterName}{" "}
                            <span className="Post_header--info">
                                {verified ? <VerifiedUserIcon/> : null }
                                {' '}@{userName}&nbsp;&nbsp;&middot;
                                <span className="Post_header--info_timeStamps">{RandomTimers.timeStamps}h</span>
                            </span>
                        </h4>
                        <div className="Post_headerText--dropDown" onClick={handleClick}><Dropdown width={'1rem'} /></div>
                            <React.Fragment>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}>
                                        {
                                            userName !== 'icegeek_07' ? 
                                            MenuTweets(userName).map((ico,id) => (
                                                <MenuItem 
                                                onClick={handleClose}
                                                style={{
                                                    display : 'flex',
                                                    alignContent : 'flex-start',
                                                    gridGap : '0.7rem',
                                                    alignItems: 'center'
                                                }}
                                                key={id}>
                                                    <div style={{
                                                        width : '1rem',
                                                        fill : 'gray'
                                                    }}>
                                                        {ico.Icon}
                                                    </div>
                                                    <div style={{fontSize :'0.9rem'}}>
                                                        {ico.name}
                                                    </div>
                                                </MenuItem>
                                            ))
                                            : 
                                            MenuIcons.map((ico,id) => (
                                                <MenuItem 
                                                onClick={MenuIcons[0].name === 'Delete' ?() => OpenModal(getID) : handleClose}
                                                style={{
                                                    display : 'flex',
                                                    alignContent : 'flex-start',
                                                    gridGap : '0.5rem',
                                                    alignItems: 'center'
                                                }}
                                                key={id}>
                                                    <div style={{
                                                        fill : ico.Icon === MenuIcons[0].Icon ? 
                                                        '#EA3E62' : 'gray',
                                                        width : '1rem'
                                                    }}>
                                                        {ico.Icon}
                                                    </div>
                                                    <div style={{color : ico.name === MenuIcons[0].name ?
                                                        '#EA3E62' : null,
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        {ico.name}
                                                    </div>
                                                </MenuItem>
                                            ))   
                                        }

                                </Menu>
                            </React.Fragment>
                    </div>
                    { describe ? <div className="Post_headDesc" style={{marginBottom : !hashtags ? '0.3rem' :  null}}>
                        <p>{describe}</p>
                    </div> : null }
                    {hashtags ? <p 
                    className="HashTags" 
                    style={{color : 'var(--twitter-def-col',margin: describe ? '0.8rem 0 0.6rem 0' :  '0 0 0.6rem 0'}}>{hashtags}</p> : null }
                 </div>
                <div className="Post_item">
                    <img
                    ref={ImageRef}
                    src={postSrc}
                    width="500"
                    alt="" />
                    {PostType}
                </div>
                <div className="Post_footer" style={{marginTop : !postSrc ? '0.5rem' : '1rem'}}>
                    {FooterIcos}
                </div> 
            </div>
            <div>
            </div>
        </div>
    )
})

export default React.memo(Post)






