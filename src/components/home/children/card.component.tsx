import "../../../stylesheet/home/children/card.scss"
import Action from "./actions.component"
import Footer from "./footer.component"

const Card = ({createdAt, description,src, userId, _id, likes}: any) => {
    return(
        <div className="card">
          <img className="card_img" src={src}/>
          <Action userId={userId._id} multimediaId={_id} totalLikes={likes}/>
          <Footer date={createdAt} description={description} name={userId.name} />
        </div>
    )
}

export default Card