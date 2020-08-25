import React from 'react'
import './Sidebar.css'
import SidebarOption from './components/Sidebar/SidebarOptions.component'
import {  Dropdown,SidebarIcons, TweetBtn, TwitterIcon } from './components/commons/Icons'
import { Avatar, Button} from '@material-ui/core'
import { FollowUp, PositionedPopper, useWindowResizer } from './components/commons/Ui'
import AccountPic from './static/images/Accountpic.webp'
const Sidebar = () => {
    const [width] = useWindowResizer();
    console.log(React.version)
    let SidebarOpt = [];
    for(let [key,value] of Object.entries(SidebarIcons))
    {
        SidebarOpt.push(<SidebarOption 
            Icon={value} 
            name={width > 1245 ? key : null} 
            key={key} 
            active={key === 'Home' ? true : false}/>)
    } 
    return (
        <div className="Sidebar">
            <div className="Twitter-header_icon"><TwitterIcon /></div>
            {SidebarOpt}
            {width > 1245 ? <Button
            variant="outlined" 
            fullWidth
            className="Sidebar--Tweet-btn">Tweet</Button> :  
            <div className="Mobile-view--tweet"><TweetBtn /></div>}
             { width < 1245 ? <Avatar 
             style={{cursor : 'pointer'}}
             src={AccountPic} 
             alt=""/> : <Button
            variant="outlined" 
            fullWidth
            className="ProfileButton">
                <FollowUp 
                Image={AccountPic}
                newClass={'Profile'}
                name={'Sayantan Samanta'}
                idname={'@icegeek_07'}
                SomeProp={<Dropdown width="1rem" />}
                />
            </Button> }
        </div>
    )
}

export default Sidebar
