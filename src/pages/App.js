import React from 'react'; 
import './App.css';
import LabelBottomNavigation, { useWindowResizer } from '../components/commons/Ui';
import Sidebar from '../Sidebar/Sidebar'
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';
import { TweetBtn,Message,Home,Noti,SearchIcon } from '../components/commons/Icons';
import { Drawer } from '@material-ui/core';
import SideDrawerContext from '../contexts/sideDrawer';
import { NavLink } from 'react-router-dom';
import SideDrawer from '../components/Mobileview/SideDrawer.component';
import { FIRST_BREAK_POINT, MED_BREAK_POINT } from '../components/commons/Breakpoints';
function App() {
  const [width] = useWindowResizer();
  const [drawerOpen,setDrawer] = React.useState(false);
  return (
    <div className="App">
      <SideDrawerContext>
        {width > FIRST_BREAK_POINT ?<Sidebar /> : null}
        <Feed ToggleDrawer={React.useCallback(() => {setDrawer(true)},[])}/>
        {width > MED_BREAK_POINT ?  <Widgets /> : null}
        {width < FIRST_BREAK_POINT ?<NavLink to="/tweet"><div className="Tweet-Btn"><TweetBtn /></div></NavLink>: null}
        {
          width < FIRST_BREAK_POINT ? <div className="Mobile-Twitter-nav"><LabelBottomNavigation
          className
          IconSet={[Home,SearchIcon,Noti,Message]}/></div> : null
        }
        {width < FIRST_BREAK_POINT ? 
        <div>
          <Drawer
          anchor={'left'}
          open={drawerOpen}
          onClose={() => setDrawer(false)} >
            <SideDrawer setClose={() => setDrawer(false)}/>
          </Drawer>
        </div>
        : null}
      </SideDrawerContext>
    </div>
  );
}

export default App;