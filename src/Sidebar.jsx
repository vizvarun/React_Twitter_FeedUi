import React from 'react'
import './Sidebar.css'
import SidebarOption from './components/Sidebar/SidebarOptions.component'
import {  Dropdown,MoreDropDown,SidebarIcons, TwitterIcon } from './components/commons/Icons'
import { Button,MenuItem } from '@material-ui/core'
import { FollowUp, ProfileMenu,ControlledAccordions } from './components/commons/Ui'
import AccountPic from './static/images/Accountpic.webp'
const Sidebar = () => {
    let SidebarOpt = [];
    for(let [key,value] of Object.entries(SidebarIcons))
    {
        SidebarOpt.push(<SidebarOption 
            Icon={value} 
            name={key} 
            key={key} 
            active={key === 'Home' ? true : false}/>)
    } 
    return (
        <div className="Sidebar">
            {TwitterIcon}
            {SidebarOpt}
            <ProfileMenu
            ButtonChildren={
                <>
                    {MoreDropDown}
                    <h2>More</h2>
                </>
            }/>
            <Button
            variant="outlined" 
            fullWidth 
            className="Sidebar--Tweet-btn">Tweet</Button>
            <ControlledAccordions
            IconExpand={Dropdown}  
            ButtonChildren={
                <FollowUp 
                Image={AccountPic}
                name={'Sayantan Samanta'}
                idname={'@icegeek_07'}
                newClass={'Profile'}
                />
            }
            MenuChildren={
               <div className="ProfileInfo">
                <MenuItem>Helllo</MenuItem>
                <MenuItem>Helllo</MenuItem>
                <MenuItem>Helllo</MenuItem>
               </div>
            }
            />
        </div>
    )
}

export default Sidebar
