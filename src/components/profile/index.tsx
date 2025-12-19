import Card from "./children/cards.component"
import Header from "./children/hearder.component"
import "../../stylesheet/profile/profile.scss"

const Profile = () => {
    return(
        <div className="profile">
            <Header/>
            <Card/>
        </div>
    )
}

export default Profile