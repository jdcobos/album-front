import { Fragment, useEffect, useState } from "react";
import "../../../stylesheet/profile/children/card.scss";
import { isEmpty } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { GET_MULTIMEDIA_BY_USER } from "../../../actions/multimedia.actions";
import Add from '../../../assets/icons/Add.svg'
import AddMultimedia from "./addMultimetia.component";

const Card = () => {  
  const dispatch = useDispatch<AppDispatch>()
  const {  multimediaUser } = useSelector((state: RootState) => state.multimedia)
  const [open, setOpen] = useState(false)
  const id = localStorage.getItem("id");

  useEffect(()=>{
    if(isEmpty(multimediaUser)){
        if (!id) return;
        dispatch(GET_MULTIMEDIA_BY_USER({userId:id}))
    }
  },[])

  return (
    <Fragment>
      <div className="cardProfile">
          <>
          { !isEmpty(multimediaUser) && <>
              {multimediaUser.map((item: any, index) => (
                <div key={index} className="cardProfile_card">
                    <img src={item.src} alt={`Card ${index}`} />
                </div>
                ))}
          </>}
       
            <div className="cardProfile_cardPlus" onClick={()=> setOpen(true)}>
                <img src={Add}/>
                Agregar un nuevo momento
             </div>
          </>
          <AddMultimedia open={open} setOpen={setOpen}/>
      </div>
    </Fragment>
  );
};

export default Card;
