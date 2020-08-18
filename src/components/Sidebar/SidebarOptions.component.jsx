import React from 'react'

const SidebarOption = ({Icon,name,active}) => {
    return (
        <div className={`Sidebar-option ${active && `active`}`}>
            {Icon}
            <h2>{name}</h2>
        </div>
    )
}

export default SidebarOption
