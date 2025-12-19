import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/index'
import { GET_MULTIMEDIA } from '../../actions/multimedia.actions'
import Card from '../home/children/card.component'
import "../../stylesheet/home/home.scss"
import { isEmpty } from 'ramda'

const Multimedia = () => {
      const dispatch = useDispatch<AppDispatch>()
      const { loading, multimedia } = useSelector((state: RootState) => state.multimedia)
    
      useEffect(()=>{
            dispatch(GET_MULTIMEDIA())
      },[]
    )
     
    return(
        <>
            {loading ? "cargando...": 
            <>
                <div className='cards-container'>
                    {!isEmpty(multimedia) ? multimedia.map((item: any)=> <Card {...item}/> ) : <div className='cards-message'>Todavía nadie ha compartido un momento. ¡Sé el primero haciendo clic en el botón “+”!</div>}
                </div>
            </> 
            }
        </>
    )
}

export default Multimedia