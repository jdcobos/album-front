import '../../../stylesheet/home/children/footer.scss'
import { dateFromFormat } from '../../../utils/dateFromFormat.util'
import CollapsibleText from '../../commons/collapsibleText/collapsibleText.component'
const Footer = ({date, description, name}: any) => {
    return(
        <div className="footer">
            <div>
            </div>
            <div className='footer_body'> 
                <div className="footer_body-description">
                    <span>{`${name}: `}</span>
                    <CollapsibleText text={description} lines={2}/>
                </div>
                <div className='footer_body-date'>
                    {dateFromFormat(date)}
                </div>
            </div>
        </div>
    )
}

export default Footer