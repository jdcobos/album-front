import { useEffect, useState } from "react"
import Header from "../home/children/header.component"
import "../../stylesheet/register/register.scss"
import type { AppDispatch } from "../../store"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { REGISTER } from '../../actions/auth.actions'
const Register = () => {

    const [form, setForm] = useState({name: "", email:"", password:"", confirmPassword:""})
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
  
    const onRegister = () => {
        const { name, email, password, confirmPassword } = form;
        if (!name || !email || !password || !confirmPassword) {
            alert("Todos los campos son obligatorios");
            return;
        }
         if (!emailRegex.test(email)) {
            alert("Ingrese un correo electrónico válido");
            return;
        }
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        dispatch(REGISTER({ name, email, password })).then((value) => {
            if (value?.payload?.register) {
                alert("Registrado exitosamente, serás redireccionado para que inicies sesión");
                setTimeout(()=>{navigate("/");},1000)
            } else {
                alert("Correo ya registrado");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Ocurrió un error inesperado");
        });
    }
    
    return(
        <div className="register">
          <Header/>
          <div className="register_content">
            <div className="register_content_card">
                <div className="register_content_headerCard">
                    Registro
                </div>
                <div className="register_content_textCard">
                    Regístrate y comparte los mejores momentos del evento con todos los invitados.
                </div>
                   <input
                    className='input_primary'
                    placeholder="Nombre completo"
                    type="text"
                    onChange={(e) =>setForm({...form, name: e.target.value})}
                />
                 <input
                    className='input_primary'
                    placeholder="Correo Electrónico"
                    type="text"
                    onChange={(e) =>setForm({...form, email: e.target.value})}
                />
                <input
                    className='input_primary'
                    placeholder="Contraseña"
                    type="password"
                    onChange={(e) =>setForm({...form, password: e.target.value})}
                />
                <input
                    className='input_primary'
                    placeholder="Confirmar contraseña"
                    type="password"
                    onChange={(e) =>setForm({...form, confirmPassword: e.target.value})}
                />
               <button className="register_content_button" onClick={() => onRegister()}>Registrarse</button>
            </div>
          </div>
        </div>
    )
}

export default Register