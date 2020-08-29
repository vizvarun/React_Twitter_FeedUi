import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { FIRST_BREAK_POINT } from './components/commons/Breakpoints'
import { useWindowResizer } from './components/commons/Ui'
import App from './pages/App'
import MobileViewTweet from './pages/MobileViewTweet'

const TwitterApp = () => {
    const [width] = useWindowResizer();
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    {
                        width < FIRST_BREAK_POINT ? <Route path="/tweet" element={<MobileViewTweet />} /> : null
                    }
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default TwitterApp
