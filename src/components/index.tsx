import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './login'
import Home from './home'
import Register from './register'
import ProtectedRoute from '../middlewares/ProtectedRoute.middleware'
const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index