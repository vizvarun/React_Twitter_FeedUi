import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataSaver, Display, Dropdown, HelpCenter, Mutual, Promoted, SettPriv, VerifiedUserIcon } from './Icons'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Modal from '@material-ui/core/Modal';
import { Profile,Lists, Topics, Bookmark, Moments, Analytics, TwitterAds } from './Icons'


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

const useNavStyles = makeStyles({
  root: {
    width: 'auto',
  },
});

export default function LabelBottomNavigation({IconSet}) {
  const classes = useNavStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={`${classes.root} Bottom-nav`}>
        {
          IconSet.map((Icon,id) =>{
            return <BottomNavigationAction 
            key={id} 
            value="recents" 
            icon={<Icon />} />
          })
        }
    </BottomNavigation>
  );
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 300,
    maxHeight : 300,
    gridGap :'0.5rem',
    display : 'flex',
    flexDirection: 'column',
    alignContent : 'space-between',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderRadius : '1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline:'none'
  },
}));

export const DeleteModal = React.memo(({Open,ModalClose,DeleteTweet}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{textAlign : 'center'}}>Delete Tweet?</h2>
      <p id="simple-modal-description" style={{textAlign: 'center',color : 'gray',marginBottom : '0.5rem'}}>
        This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. 
      </p>
      <div style={{
        display : 'flex',
        gridGap : '1rem',
        justifyContent : 'center'
      }}>
      <button
      onClick={ModalClose} 
      style={{
          backgroundColor : '#EDEDED',
          outline:'none',
          border : 'none',
          borderRadius : '30px',
          padding : '0.5rem 2rem',
          cursor : 'pointer'
        }}>
        <h3>Cancel</h3>
      </button>
      <button 
      onClick={DeleteTweet} 
      style={{
          backgroundColor : '#EA3E62',
          color : 'var(--twitter-bg-def)',
          outline:'none',
          border : 'none',
          borderRadius : '30px',
          padding : '0.5rem 2rem',
          cursor : 'pointer'
        }}>
        <h3>Delete</h3>
      </button>
      </div>
    </div>
  );

  return (
    <div style={{
      display : 'none'
    }}>
      <Modal
        open={Open}
        onClose={ModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
})

export const DrawerList={
  ListA : [
      {
          Icon : <Profile />,
          name :  'Profile'
      },
      {
          Icon : <Lists />,
          name : 'Lists'
      },
      {
          Icon : <Topics />,
          name : 'Topics'
      },
      {
          Icon : <Bookmark />,
          name : 'Bookmarks'
      },
      {
          Icon : <Moments />,
          name : 'Moments'
      }
  ],
  ListB : [
      {
          Icon : <TwitterAds />,
          name : 'Twitter Ads'
      },
      {
          Icon : <Analytics />,
          name : 'Analytics'
      }
  ],
  ListC : [
    {
      Icon : <SettPriv />,
      name : 'Settings and privacy'
    },
    {
      Icon : <HelpCenter />,
      name : 'Help Center'
    }
  ],
  ListD : [
    {
      Icon : <DataSaver />,
      name : 'Data Saver'
    },
    {
      Icon : <Display />,
      name : 'Display'
    }
  ]
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