import React from 'react'
import { NavLink } from 'react-router-dom'
import { BackMob } from '../components/commons/Icons'
import TweetboxComponent from '../components/Feed/Tweetbox.component'

const MobileViewTweet = () => {
    return (
        <React.Fragment>
            <NavLink to="/">
                <div className="Mob-Tweet--header">
                    <div style={{
                        fill : 'var(--twitter-def-col)',
                        width: '1.5rem',
                        margin: '0.5rem',
                        cursor : 'pointer',
                        padding: '0.3rem,'
                    }}><BackMob /></div>
                </div>
            </NavLink>
            <TweetboxComponent />
        </React.Fragment>
    )
}

export default MobileViewTweet
