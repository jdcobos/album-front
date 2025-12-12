import { useEffect, useState } from 'react'
import heart from '../../../assets/icons/heart.svg'
import heartRead from '../../../assets/icons/header-red.svg'
import "../../../stylesheet/home/children/actions.scss"
import type { AppDispatch } from '../../../store/index'
import { GET_LIKE, LIKE_MULTIMEDIA } from '../../../actions/multimedia.actions'
import { useDispatch } from 'react-redux'

const Action = ({userId, multimediaId, totalLikes} : any) => {
    console.log(totalLikes)
    const dispatch = useDispatch<AppDispatch>()
    const [like, setLike] = useState(false)

    const onChangeLike = (like: boolean) => {
        setLike(like)
        dispatch(LIKE_MULTIMEDIA({userId, id:multimediaId, action: like ? "like" : "unlike"}))
    }   

    useEffect(()=>{
        dispatch( GET_LIKE(multimediaId)).then((value)=>{ setLike(value.payload.like)})
    },[])

    return (
        <div className="actions">
            <div className='actions_like' onClick={() =>onChangeLike(!like)}>
                <img src={like ? heartRead: heart} alt='Me gusta'/>
                <div>
                    {totalLikes ? totalLikes : 0}
                </div>
            </div>
        </div>
    )
}

export default Action