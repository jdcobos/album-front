import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './login'
const Index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Index