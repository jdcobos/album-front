import {useState} from 'react'
import NavigateBar from "../navigationBar"
import "../../stylesheet/home/home.scss"
import Header from './children/header.component'
import { VIEWS } from '../../schemas/views.schema'
import AddMultimedia from '../profile/children/addMultimetia.component';

const Home = () => {
    
    const [tab, setTab] = useState(0)
    const [showAddModal, setShowAddModal] = useState(false);
    const CurrentView = VIEWS[tab].Component;
     
    return(
        <div className='home'>
            <Header/>
            <CurrentView/>
            <NavigateBar currentTab={tab} onChange={setTab}/>
            <button 
                className="floating-add-button"
                onClick={() => setShowAddModal(true)}
            >
                +
            </button>
            <AddMultimedia 
                open={showAddModal} 
                setOpen={setShowAddModal} 
            />
        </div>
    )
}

export default Home