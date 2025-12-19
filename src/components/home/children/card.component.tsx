import "../../../stylesheet/home/children/card.scss"
import Action from "./actions.component"
import Footer from "./footer.component"

const Card = ({createdAt, description,src, userId, _id, likes}: any) => {
    return(
       <div className="card">
        <div className="card_img-container">
          <img className="card_img" src={src} alt="User content" />
        </div>
        <Action multimediaId={_id} totalLikes={likes} />
        <Footer date={createdAt} description={description} name={userId.name} />
      </div>
    )
}

export default Card