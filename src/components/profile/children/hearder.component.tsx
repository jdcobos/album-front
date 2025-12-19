import { useDispatch, useSelector } from "react-redux"
import { GET_USER } from "../../../actions/users.actions"
import "../../../stylesheet/profile/children/header.scss"
import type { AppDispatch, RootState } from "../../../store"
import { useEffect } from "react"

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {  user } = useSelector((state: any) => state.user)
        const {  countUsers } = useSelector((state: RootState) => state.multimedia)
    const id = localStorage.getItem("id");

    useEffect(()=>{
        if (!id) return;
        dispatch(GET_USER({userId:id}))
    },[])


    return(
        <div className="headerProfile">
            <div className="headerProfile_content">
                <div className="headerProfile_content-contentUser">
                    <div className="headerProfile_content-user">
                        {user.name && user.name.split(" ").slice(0, 2).map((p: string) => p[0]).join("").toUpperCase()}
                    </div>
                    {user.name}
                </div>
                <div>
                    Cantidad de momentos compartidos 
                    <div>{countUsers}</div>
                </div>
            </div>
            <div className="headerProfile_contentButton">
                <div className="headerProfile_button">
                    Cerrar sesión
                </div>
            </div>
        </div>
    )
}

export default Header