import {useEffect, useState} from 'react'
import "../../stylesheet/navigateBar/navigationBar.scss"
import NAVIGATE_BAR from '../../schemas/navigateBar.schema'
const NavigateBar = ({currentTab = 0, onChange}: any) => {

    const [tab, setTab] = useState(currentTab)

    useEffect(()=>{
      onChange && onChange(tab)
    },[tab])

    return (
     <div className="navigationBar">
       {NAVIGATE_BAR.map(({icon, iconBold}, index)=> 
       <div className="navigationBar_item" key={index} onClick={() => setTab(index)}>
          <img  src={tab === index ? iconBold : icon} className="navigationBar_item-img"/>
       </div>)}
    </div>
    )
}

export default NavigateBar