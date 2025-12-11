import { useEffect } from 'react'
import NavigateBar from "../navigationBar"
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/index'
import { GET_MULTIMEDIA } from '../../actions/multimedia.actions'
import {isEmpty} from 'ramda'
import Card from './children/card.component'
import "../../stylesheet/home/home.scss"
import Header from './children/header.component'
const Home = () => {
      const dispatch = useDispatch<AppDispatch>()
      const { loading, multimedia } = useSelector((state: RootState) => state.multimedia)
    
      useEffect(()=>{
         if(isEmpty(multimedia)){
            dispatch(GET_MULTIMEDIA())
         }
      },[multimedia]
    )
     
    return(
        <div className='home'>
            {loading ? "cargando...": 
            <>
                <Header/>
                {multimedia.map((item)=> <Card {...item}/> )}
                <NavigateBar/>
            </>
            }
        </div>
    )
}

export default Home