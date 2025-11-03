 import { useState } from 'react'
 import '../../stylesheet/login/login.scss'
 const Login = () => {

    const [value, setValue] = useState({email: "", password: ""} )

    return(
        <div className='login'>
            <div className=''>
                Album Compartido 15 Sara Cobos
            </div>
            <div>
                <input placeholder='Correo Electronico' onChange={(e) => setValue({...value, email: e.target.value}) } type='text'/>
                <input placeholder='Contraseña'onChange={(e) => setValue({...value, password: e.target.value}) }  type='password'/>
            </div>
            <div>
                <button>Iniciar sesión</button>
            </div>
        </div>
    )
 }

 export default Login