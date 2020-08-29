import React from 'react'
import { Dropdown, SearchIcon } from '../components/commons/Icons'
import './Widgets.css'
import { WidgetContainer,Widget, WhomToFollow } from '../components/commons/Ui'
import db from '../firebase/firebase.config'
const Widgets = () => {
    const [search,setSearch] = React.useState('');
    const InpRef = React.useRef(null);
    const [WidgetNow,setWidget] = React.useState([]);
    const [wtfWidget,setWtfWidget] = React.useState([]);
    const [focus,setFocus] = React.useState(false)
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
    console.log('Widgets Rendered')
    const FooterCompos = ['Terms','Privacy Policy','Cookies','Add Info','More']
    let WidgetClass = ['Widgets-inp'];
    if(focus){
        WidgetClass = ['Widgets-inp','focused'].join(' ');
    }
    return (
        <div className="Widgets">
            <div className={WidgetClass} 
            ref={InpRef} 
            onClick={() => setFocus(!focus)}>
                <SearchIcon className="Widgets-search" />
                <input 
                className="Widgets-searchbar"
                value={search}
                placeholder="Search Twitter"
                onChange={(event) => {setSearch(event.target.value)}}
                type="search"
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
