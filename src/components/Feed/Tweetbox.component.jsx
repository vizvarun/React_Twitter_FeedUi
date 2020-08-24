import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import './Tweetbox.css'
import { makeStyles } from '@material-ui/core/styles';
import Accountpic from '../../static/images/Accountpic.webp'
import { Close, Tweetbox_icons, World } from '../commons/Icons';
import db from '../../firebase/firebase.config';
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
      marginRight : '0.5rem',
      alignSelf : 'start'
    },
  }));
const Tweetbox = () => {
    const [tweet,setTweet] = React.useState('');
    const [tweetPhoto,setTweetPhoto] = React.useState('');
    const [writeTweet,setnewTweet] = React.useState(false);
    const [twitterBlueOn,setTwitterBlue] = React.useState(false)
    const triggerRefInp = React.useRef(null);
    const iconRef = React.useRef(null);
    let TweetBox_icos = [];
    const classes = useStyles();
    const onImagePostAdd = (event) =>{
      const ImageReader = new FileReader();
      ImageReader.onload = () =>{
        if(ImageReader.readyState === ImageReader.DONE){
          let Postpic = ImageReader.result;
          setTweetPhoto(Postpic)
        }
      }
      ImageReader.readAsDataURL(event.target.files[0])
    }
    const postHandler = (event) =>{
      event.preventDefault();
      db.collection('Posts').add({
        posterName : 'Sayantan Samanta',
        usernName:'icegeek_07',
        describe:tweet,
        postSrc:tweetPhoto,
        verified : false,
        uerAvatar : Accountpic
      })
    }
    const sentenceChecker = (sentence) => {
      for(let i = 0; i<sentence.split(' ').length;i++)
      {
        if(sentence.split(' ')[i].startsWith('@') || sentence.split(' ')[i].startsWith('#')){
          setTwitterBlue(true)
        }
      }
    }
    React.useEffect(() =>{
        sentenceChecker(tweet)
    },[tweet])
    for(let key of Object.keys(Tweetbox_icons)){
        TweetBox_icos.push(<div
           key={key}
          ref={iconRef} 
          className="Tweet_Functions--icon"
          onClick={key === 'photo' ? () =>triggerRefInp.current.click(): null}
          >{Tweetbox_icons[key]}</div>)
    }
    return (
        <div className="Tweetbox">
            <form onSubmit={postHandler}>
                <Avatar 
                    className={`${classes.large}`}
                    src={Accountpic}
                    alt="MyProfilePic" />
                <div className="Tweetbox_input" >
                    <input
                        type="text"
                        placeholder="What's happening?"
                        inputMode="text"
                        value={tweet}
                        onChange={(event) => setTweet(event.target.value)}
                        onClick={() => setnewTweet(true)}
                    />
                    <input
                    type="file"
                    onChange={onImagePostAdd}
                    accept="image/png,image/jpeg,image/webp"
                    ref={triggerRefInp}
                    style={{display :'none'}}
                    />
                </div>
                {tweetPhoto ?
                  <div className="Tweetbox-upload">
                    <div className="Tweet-upload--close" onClick={() => {setTweetPhoto('')}}>
                      <Close className="close" />
                    </div>
                    <img src={tweetPhoto} alt="tweet-upload"/>
                  </div>: null}
                {writeTweet || tweetPhoto ? <div className="Tweetbox_input--way" style={{gridRow : tweetPhoto? '3/4': null}}>{World}<h5>Everyone can reply</h5></div> : null}
                <div className="Tweet_Functions" style={{gridRow : writeTweet ? '4/5':tweetPhoto ? '4/5':'2/3',margin : writeTweet ? '0.5rem 0' : null}}>
                    <div className="Tweet_Functions--container">{TweetBox_icos}</div>
                    <Button
                    style={{margin: tweetPhoto ? '0.3rem 0' : null}} 
                    className="Tweet_Button" 
                    disabled={tweet.length || tweetPhoto.length ? false : true} 
                    type="submit">Tweet</Button>
                </div>
            </form>
        </div>
    )
}

export default Tweetbox

