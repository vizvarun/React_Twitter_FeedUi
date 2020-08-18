import React, { Suspense } from 'react';
import './App.css';
import Feed from './Feed';
import Widgets from './Widgets';

function App() {
  const Sidebar = React.lazy(() => import('./Sidebar.jsx'))
  return (
    <div className="App">
      <Suspense fallback={<div>Loading</div>}>
          <Sidebar />
      </Suspense>
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;