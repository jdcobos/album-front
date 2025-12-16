import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AUTH_LOGIN } from '../../actions/auth.actions'
import type { RootState, AppDispatch } from '../../store/index'
import {isEmpty} from 'ramda'
import { useNavigate } from "react-router-dom";
import logo from './../../assets/logo.svg'
import '../../stylesheet/login/login.scss'

const Login: React.FC = () => {
  const [value, setValue] = useState({ email: '', password: '' })
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const { loading, auth } = useSelector((state: RootState) => state.auth)

  const onHandleLogin = () => {
   dispatch(AUTH_LOGIN(value)).then((value)=>{
    if(value.payload === "Error de login") {
      alert("Usuario o contraseña incorrecta")
    }
   })
  }

  useEffect(()=>{
    if(!isEmpty(auth.token)){
      localStorage.setItem("token", auth.token);
      navigate("/home");
    } 
  },[auth])

  const register = () => {
    navigate("/register");
  }

  return (
    <div className="login">
      <div className='login_content'>
        <div className='login_content-contentImg'>
          <img className='login_content-contentImg_img' src={logo} alt='logo'/>
        </div>
        <div className='login_content_contentInputs'>
          <input
            className='input_primary'
            placeholder="Correo Electrónico"
            type="text"
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <input
          className='input_primary'
            placeholder="Contraseña"
            type="password"
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
        </div>
        {loading && <p>Cargando...</p>}
        <div className='login_button'>
          <div onClick={() =>register()}>¿No tienes cuenta? click aquí</div>
          <button className='buttons_primary' onClick={onHandleLogin} disabled={loading}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
