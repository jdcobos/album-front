import "../../../stylesheet/home/children/card.scss"
import Footer from "./footer.component"

const Card = ({createdAt, description,src, userId}: any) => {
    return(
        <div className="card">
          <img className="card_img" src={src}/>
          <Footer date={createdAt} description={description} name={userId.name}/>
        </div>
    )
}

export default Card