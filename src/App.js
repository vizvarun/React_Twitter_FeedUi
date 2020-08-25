import React from 'react';
import './App.css';
import LabelBottomNavigation, { useWindowResizer } from './components/commons/Ui';
import Sidebar from './Sidebar'
import Feed from './Feed';
import Widgets from './Widgets';
import { TweetBtn,Message,Home,Noti,SearchIcon } from './components/commons/Icons';

function App() {
  const [width] = useWindowResizer();
  return (
    <div className="App">
      {width > 550 ?<Sidebar /> : null}
      <Feed />
      {width > 1075 ?  <Widgets /> : null}
      {width < 430 ?<div className="Tweet-Btn"><TweetBtn /></div> : null}
      {
        width <550 ? <div className="Mobile-Twitter-nav"><LabelBottomNavigation
        className 
        IconSet={[Home,SearchIcon,Noti,Message]}/></div> : null
      }
    </div>
  );
}

export default App;