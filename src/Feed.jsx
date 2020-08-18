import { IconButton } from '@material-ui/core'
import React from 'react'
import { TweetFirst } from './components/commons/Icons'
import './Feed.css'
const Feed = () => {
    return (
        <div className="Feed">
            {/*Header*/}
            {/*Tweet*/}
            {/*Posts*/} 
           <div className="Feed_header">
                <div className="Feed_header--container">
                    <h2>Home</h2>
                    <IconButton >{TweetFirst}</IconButton>
                </div>
           </div>
        </div>
    )
}

export default Feed
