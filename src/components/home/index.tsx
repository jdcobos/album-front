import {useState} from 'react'
import NavigateBar from "../navigationBar"
import "../../stylesheet/home/home.scss"
import Header from './children/header.component'
import { VIEWS } from '../../schemas/views.schema'
const Home = () => {
    
    const [tab, setTab] = useState(0)
    const CurrentView = VIEWS[tab].Component;
     
    return(
        <div className='home'>
            <Header/>
            <CurrentView/>
            <NavigateBar currentTab={tab} onChange={setTab}/>
        </div>
    )
}

export default Home