import { Avatar, Divider } from '@material-ui/core'
import React from 'react'
import { Add, Close } from '../commons/Icons'
import './SideDrawer.css'
import AccountPic from '../../static/images/Accountpic.webp'
import { DrawerList } from '../commons/Ui'
const SideDrawer = ({setClose}) => {
    const DrawerOptions = (Object.values(DrawerList).map((eachList,id) =>(
       <React.Fragment key={id}>
            <div className="List-Section">
                {
                    eachList.map(option => {
                        return <div className="Options">
                            <div>{option.Icon}</div>
                            <div>{option.name}</div>
                        </div>
                    })
                }
            </div>
            <Divider />
       </React.Fragment>
    ))) 
    return (
        <div className="Drawer-Structure">
            <div className="SideDrawer-Header">
                <div className="SideDrawer-Header--container">
                    <h2>Account info</h2>
                    <div className="Close" onClick={setClose}><Close /></div>
                </div>
            </div> 
            <main className="SideDrawer-Main">
                <div className="SideDrawer-Main--header">
                    <div className="SideDrawer-Main--header_info">
                        <div className="Avatar">
                            <Avatar src={AccountPic} alt="" sizes="sm" />
                        </div>
                        <div className="Profile">
                            <h3>Sayantan Samanta</h3>
                            <h4>@icegeek_07</h4>
                        </div>
                        <div className="Follow-count">
                            <h4>14<span>{" "}Following</span></h4>
                            <h4>1<span>{" "}Follower</span></h4>
                        </div>
                    </div>
                    <div className="Add"><Add /></div>
                </div>
                <div className="SideDrawer-Main--Options">
                    {DrawerOptions}
                </div>
                <div style={{padding: '1rem'}}>Log out</div>
            </main>
        </div>
    )
}

export default SideDrawer
