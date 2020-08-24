import React from 'react';
import Menu from '@material-ui/core/Menu';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Dropdown, Mutual, Promoted, VerifiedUserIcon } from './Icons'
import IconButton from '@material-ui/core/IconButton';


export const ProfileMenu = ({ButtonChildren,MenuChildren,btnClass}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Sidebar-option"  style={{
      borderRadius : '30px'
    }}>
      <Button 
      aria-controls="simple-menu" 
      aria-haspopup="true" 
      onClick={handleClick} 
      fullWidth 
      className={btnClass}>
        {ButtonChildren}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="Popup-Menu"
      >
       {MenuChildren}
      </Menu>
    </div>
  );
}


export const FollowUp = ({Image,SomeProp,name,idname,newClass}) =>{
    return(
        <>
            <Avatar src={Image} alt="Name" className={`${newClass}-img`} />
            <div className={`${newClass}-name--container`}>
              <h4 className={`${newClass}-name`}>{name}</h4>
              <h5 className={`${newClass}-idname`}>{idname}</h5>
            </div>
            {SomeProp}
        </>
    )
}

const WidgetsStyles = makeStyles((theme) => ({
  Widgetroot: {
    width: '100%',
    marginTop: '1rem',
    backgroundColor: 'var(--twitter-space-col)',
    borderRadius: '1rem',
  }
}));
export const WidgetContainer = ({children,moreClass,header}) =>{
  const styles = WidgetsStyles();
  return(
    <div className={`${styles.Widgetroot} ${moreClass}`}>
        <h2>{header}</h2>
        {children}
        <div className="Widgets-widgetcontainer--footer">
          <span>Show more</span>
        </div>
    </div>
  )
}
const IndividualWidgets= makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  rounded : {
      width: theme.spacing(7),
      height: theme.spacing(7),
      color: '#fff',
      borderRadius : '1rem'
  },
  followBtn : {
    padding : '0.3rem 1rem',
    outline : 'none',
    border: '1px solid var(--twitter-def-col)',
    borderRadius : '1.5rem',
    color : "var(--twitter-def-col)",
    cursor : 'pointer',
    fontWeight : 800,
    '&:hover' : {
      backgroundColor : 'var(--twitter-def-hover)'
    }
  }
}));
export const Widget = ({Topic,type,tweets,trending,TrendingHash,avatarSrc}) => {
  const styles = IndividualWidgets();
  const numeralCheck = (numeral) => {
        if(numeral<10000){
          return `${numeral} Tweets`;
        }
        else if(numeral > 10000 && numeral <1000000){
          return `${(numeral/1000).toFixed(1)}K Tweets`
        }
        else if(numeral > 1000000){
          return `${(numeral/1000000).toFixed(2)}M Tweets`
        }
   }
  return(
    <div className={`${styles.root} widget`}>
        <div className="widget-header">
          <h5>
            <span>{Topic}</span>{' '}
            {type ? <span>&middot;{' '}{type}</span> : null}
          </h5>
          <h4>{TrendingHash}</h4>
        <h5 className="widget-footer">
          {
            tweets ? <span>{numeralCheck(tweets)}</span> : 
            trending ? <span>Trending with:
              <span style={{color : 'var(--twitter-def-col'}}>#{trending}</span>
            </span>:
            null
          }
        </h5>
        </div>
        <div className="widget-info">
          {avatarSrc ?<Avatar 
          variant='rounded' 
          className={`${styles.rounded} widget-avatar`}
          src={avatarSrc} 
          /> : <Dropdown width={'1rem'}/>}
        </div>
    </div>
  )
}
export const WhomToFollow = ({avatarSrc,mutual,AccName,userName,promoted,verified}) => {
  const [followState,setState] = React.useState('Follow')
  const styles = IndividualWidgets();
  return(
    <div className="WhomToFollow">
        <div className="WhomToFollow-header">
          {mutual? <Mutual width={'1rem'}/> : null}
          <Avatar src={avatarSrc} className="WhomToFollow-header_avatar" />
        </div>
        <div className="WhomToFollow-content">
          {mutual?<h5>{mutual}</h5> : null}
          <h5>{AccName} {verified ?<VerifiedUserIcon />:null}</h5>
          <h5 className="WhomToFollow-userName">@{userName}</h5>
          {mutual?<p>{describe}</p>: promoted ? <h6><Promoted /> Promoted</h6> : null}
        </div>
        <div className="WhomToFollow-btn">
          <button 
          className={styles.followBtn}
          style={{
            backgroundColor : followState === 'Following' ? 
            'var(--twitter-def-col)' : null,
            color : followState === 'Following' ? 
            'var(--twitter-bg-def)' : null
          }}
          onClick={() => followState === 'Follow' ? 
          setState('Following'): followState === 'Following' ? 
          setState('Follow'):followState}>
              {followState}
          </button>
        </div>
    </div>
  )
}
const BtnStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0.3)
  }
}));
export const IconButtonMaker = ({children}) => {
  const styles = BtnStyles();
  return(
    <IconButton aria-label="delete" className={styles.margin} size="small">
          {children}
      </IconButton>
  )
}

export const useWindowResizer = () => {
  const [resize,setResize] = React.useState([window.innerWidth,window.innerHeight])
  const resizehandler = () => {
    setResize([window.innerWidth,window.innerHeight]);
  }
  React.useLayoutEffect(() => {
    window.addEventListener('resize',resizehandler);
    return () => window.removeEventListener('resize',resizehandler)
  },[]);

  return resize;
}