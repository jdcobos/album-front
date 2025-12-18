import { useDispatch, useSelector } from "react-redux"
import { GET_USER } from "../../../actions/users.actions"
import "../../../stylesheet/profile/children/header.scss"
import type { AppDispatch, RootState } from "../../../store"
import { useEffect } from "react"
const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {  user } = useSelector((state: RootState) => state.user)
        const {  countUsers } = useSelector((state: RootState) => state.multimedia)
    const id = localStorage.getItem("id");

    useEffect(()=>{
        if (!id) return;
        dispatch(GET_USER({userId:id}))
    },[])


    return(
        <div className="headerProfile">
            <div className="headerProfile_content">
                <div>
                    {user.name}
                </div>
                <div>
                    cantidad de momentos compartidos: {countUsers}
                </div>
            </div>
            <div className="headerProfile_button">
                Cerrar sesión
            </div>
        </div>
    )
}

export default Header