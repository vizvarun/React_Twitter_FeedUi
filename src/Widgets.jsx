import React from 'react'
import { Dropdown, SearchIcon } from './components/commons/Icons'
import './Widgets.css'
import { WidgetContainer,Widget, WhomToFollow, useWindowResizer } from './components/commons/Ui'
import db from './firebase/firebase.config'
const Widgets = () => {
    const [search,setSearch] = React.useState('');
    const InpRef = React.useRef(null);
    const TriggerRef = React.useRef(null);
    const [WidgetNow,setWidget] = React.useState([]);
    const [wtfWidget,setWtfWidget] = React.useState([]);
    React.useEffect(() =>{
       if(TriggerRef.current.click()){
           console.log("Hehe")
       }
    },[])
    React.useEffect(() =>{
        db.collection('Widget').onSnapshot(snapShot =>{
            setWidget(snapShot.docs.map(each=> {
                return{
                    ...each.data(),
                    id : each.id
                }
            }))
        })
        db.collection('wtfWidget').onSnapshot(snapshot =>{
            setWtfWidget(snapshot.docs.map(each => {
                return {
                    ...each.data(),
                    id : each.id
                }
            }))
        })
    },[])
    const [width,height] = useWindowResizer();
    console.log(height)
    const FooterCompos = ['Terms','Privacy Policy','Cookies','Add Info','More']
    return (
        <div className="Widgets">
            <div className="Widgets-inp" ref={InpRef}>
                <SearchIcon className="Widgets-search" />
                <input 
                className="Widgets-searchbar"
                value={search}
                placeholder="Search Twitter"
                onChange={(event) => {setSearch(event.target.value)}}
                type="search"
                ref={TriggerRef}
                />
            </div>
            <WidgetContainer 
            moreClass={'Widgets-widgetcontainer'}
            header="What's happening"
            children={<>
            {
                WidgetNow.map(widg =>{
                    return <Widget
                    key={widg.id}
                    Topic={widg.Topic}
                    type={widg.type}
                    avatarSrc={widg.avatarSrc}
                    TrendingHash={widg.TrendingHash}
                    tweets={widg.tweets}
                    trending={widg.trending}
                    />
                })
            }
            </>
            }
            />
            <WidgetContainer
            header="Who to follow"
            moreClass="WhomToFollow-widget"
            children={
                <>
                    {
                        wtfWidget.map(widg =>{
                            return <WhomToFollow
                            key={widg.id}
                            avatarSrc={widg.avatarSrc}
                            mutual={widg.mutual}
                            AccName={widg.AccName}
                            userName={widg.userName}
                            promoted={widg.promoted}
                            verified={widg.verified}
                            />
                        })
                    }
                </>
            }
            />
            <div className="Widgets-Footer">
                <ul>
                    {
                        FooterCompos.map((each,id) => {
                            return <li key={id}>{each} {each === 'More' ? <Dropdown width={'0.8rem'}/> : null}</li>
                        })
                    }
                </ul>
                <h5>&copy;{new Date().getFullYear()}Twitter,Inc</h5>
            </div>
        </div>
    )
}

export default Widgets
