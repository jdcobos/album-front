import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AUTH_LOGIN } from '../../actions/auth.actions'
import type { RootState, AppDispatch } from '../../store/index'
import '../../stylesheet/login/login.scss'

const Login: React.FC = () => {
  const [value, setValue] = useState({ email: '', password: '' })
  const dispatch = useDispatch<AppDispatch>()

  // Leer estado de auth (loading y error)
  const { loading } = useSelector((state: RootState) => state.auth)

  const onHandleLogin = () => {
    console.log("prueba")
    dispatch(AUTH_LOGIN(value))
  }

  return (
    <div className="login">
      <div>Album Compartido</div>

      <div>
        <input
          placeholder="Correo Electronico"
          type="text"
          value={value.email}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={value.password}
          onChange={(e) => setValue({ ...value, password: e.target.value })}
        />
      </div>

      {loading && <p>Cargando...</p>}

      <div>
        <button onClick={onHandleLogin} disabled={loading}>
          Iniciar sesión
        </button>
      </div>
    </div>
  )
}

export default Login
