import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store"
import { isEmpty } from "ramda"
import { GET_MULTIMEDIA } from "../../actions/multimedia.actions"
import { useEffect } from "react"
import '../../stylesheet/photoWall/photoWall.scss'

export interface MultimediaItem {
  src: string

}

const PhotoWall = () => {
    const dispatch = useDispatch<AppDispatch>()
      const { loading, multimedia } = useSelector((state: RootState) => state.multimedia)
    
      useEffect(()=>{
         if(isEmpty(multimedia)){
            dispatch(GET_MULTIMEDIA())
         }
      },[multimedia]
    )
    return (
     <div className="photoWall">
        <>
            {!loading ? (
            <>
                {multimedia.map((item: MultimediaItem) => (
                <div className="photoWall_card">
                    <img src={item?.src} />
                </div>
                ))}
            </>
            ) : (
            "cargando..."
            )}
        </>
        </div>
    );
}

export default PhotoWall;