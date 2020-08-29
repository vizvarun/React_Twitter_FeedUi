import React, { createContext, useState } from 'react'
export const drawerContext = createContext();
const SideDrawer = ({children}) => {
    const [isOpen,setSideDraw] = useState(false);
    const [ModalOpen,setModal] = useState(false);
    const [postID,setId] = useState('');
    return (
        <drawerContext.Provider value={{
            isOpen,
            ModalOpen,
            postID,
            setDrawerOpen : () =>{
                setSideDraw(true)
            },
            setDrawerClose : () => {
                setSideDraw(false)
            },
            OpenModal : (id) =>{
                return setModal(true),
                setId(id)
            },
            CloseModal : () => {
                setModal(false)
            }
        }}>
            {children}
        </drawerContext.Provider>
    )
}

export default React.memo(SideDrawer)
