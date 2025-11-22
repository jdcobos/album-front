import {useState} from 'react'
import "../../stylesheet/navigateBar/navigationBar.scss"
import NAVIGATE_BAR from '../../schemas/navigateBar.schema'
const NavigateBar = () => {

    const [tab, setTab] = useState(0)

    return (
     <div className="navigationBar">
       {NAVIGATE_BAR.map(({icon}, index)=> 
       <div className="navigationBar_item" key={index} onClick={() => setTab(index)}>
          <img  src={icon} className="navigationBar_item-img"/>
       </div>)}
    </div>
    )
}

export default NavigateBar