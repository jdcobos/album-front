import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './login'
import Home from './home'
const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index