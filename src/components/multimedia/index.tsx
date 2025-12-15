import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/index'
import { GET_MULTIMEDIA } from '../../actions/multimedia.actions'
import {isEmpty} from 'ramda'
import Card from '../home/children/card.component'
import "../../stylesheet/home/home.scss"

const Multimedia = () => {
      const dispatch = useDispatch<AppDispatch>()
      const { loading, multimedia } = useSelector((state: RootState) => state.multimedia)
    
      useEffect(()=>{
         if(isEmpty(multimedia)){
            dispatch(GET_MULTIMEDIA())
         }
      },[multimedia]
    )
     
    return(
        <>
            {loading ? "cargando...": 
            <>
                <div className='cards-container'>
                    {multimedia.map((item)=> <Card {...item}/> )}
                </div>
            </> 
            }
        </>
    )
}

export default Multimedia