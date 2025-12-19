import { useEffect, useState } from 'react'
import heart from '../../../assets/icons/heart.svg'
import heartRead from '../../../assets/icons/header-red.svg'
import "../../../stylesheet/home/children/actions.scss"
import type { AppDispatch } from '../../../store/index'
import { GET_LIKE, LIKE_MULTIMEDIA } from '../../../actions/multimedia.actions'
import { useDispatch } from 'react-redux'

const Action = ({ multimediaId, totalLikes} : any) => {
    const dispatch = useDispatch<AppDispatch>()
    const [like, setLike] = useState(false)
      const [currentTotalLikes, setTotalLikes] = useState(totalLikes)
    const id = localStorage.getItem("id");

   const onChangeLike = (newLikeState: boolean) => {
    if (!id) return;
    setLike(newLikeState);
    setTotalLikes((prev: any) => newLikeState ? prev + 1 : Math.max(0, prev - 1));
    dispatch(
        LIKE_MULTIMEDIA({
            userId: id,
            id: multimediaId,
            action: newLikeState ? "like" : "unlike",
        })
    ).then((response: any) => {
        if (response?.payload?.totalLikes !== undefined) {
            setTotalLikes(response.payload.totalLikes);
        }
    }).catch((error) => {
        console.error("Error updating like:", error);
        setLike(!newLikeState);
        setTotalLikes((prev: any) => newLikeState ? Math.max(0, prev - 1) : prev + 1);
    });
};


   useEffect(() => {
    if (!id) return;

    dispatch(GET_LIKE({ multimediaId, userId: id }))
        .then((value: any) => {
        setLike(value.payload.like);
        });
    }, [dispatch, id, multimediaId]);

    return (
        <div className="actions">
            <div className='actions_like' onClick={() =>onChangeLike(!like)}>
                <img src={like ? heartRead: heart} alt='Me gusta'/>
                <div>
                    {currentTotalLikes ? currentTotalLikes : 0}
                </div>
            </div>
        </div>
    )
}

export default Action