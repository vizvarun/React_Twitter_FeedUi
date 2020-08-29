import React from 'react'
import './Sidebar.css'
import SidebarOption from '../components/Sidebar/SidebarOptions.component'
import {  Dropdown,SidebarIcons, TweetBtn, TwitterIcon } from '../components/commons/Icons'
import { Avatar, Button} from '@material-ui/core'
import { useWindowResizer } from '../components/commons/Ui'
import AccountPic from '../static/images/Accountpic.webp'
import { DESKTOP_BREAK_POINT } from '../components/commons/Breakpoints'
const Sidebar = () => {
    const [width] = useWindowResizer();
    let SidebarOpt = [];
    for(let [key,value] of Object.entries(SidebarIcons))
    {
        SidebarOpt.push(<SidebarOption 
            Icon={value} 
            name={width > DESKTOP_BREAK_POINT ? key : null} 
            key={key} 
            active={key === 'Home' ? true : false}/>)
    } 
    console.log('Sidebar Rendered')
    return (
        <div className="Sidebar">
            <div className="Twitter-header_icon"><TwitterIcon /></div>
            {SidebarOpt}
            {width > DESKTOP_BREAK_POINT ? <Button
            variant="outlined" 
            fullWidth
            className="Sidebar--Tweet-btn">Tweet</Button> :  
            <div className="Mobile-view--tweet"><TweetBtn /></div>}
             { width < DESKTOP_BREAK_POINT ? <Avatar 
             style={{
                 cursor : 'pointer',
                 position : 'absolute',
                 right : '1.6rem',
                 bottom: '0.8rem'
                }}
             src={AccountPic} 
             alt=""/> : <button className="Profile-button">
                 {
                     <>
                        <div className="Avatar"><Avatar 
                        src={AccountPic}
                        alt=""
                        /></div>
                        <div className="Name-Container">
                            <h4>Sayantan Samanta</h4>
                            <h4>@icegeek_07</h4>
                        </div>
                        <div className="Dropdown"><Dropdown width="1rem"/> </div>
                     </>
                     
                 }
                 </button>}
        </div>
    )
}

export default Sidebar
