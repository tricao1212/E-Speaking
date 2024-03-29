import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './pages/admin/Admin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/landing_page/Home';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import CheckRoute from './components/CheckRoute';
import Login from './pages/login/Login'
import HomeUser from "./pages/user/homeUser/HomeUser";
import Render from './pages/user/study/Render';
import Result from './pages/user/study/Result';
function App() {
  return (
    <AuthContextProvider>
      <CheckRoute />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Protected><Admin /></Protected>} />
        <Route path="/user/*" element={<Protected><HomeUser /></Protected>} />
        <Route path="/study" element={<Render/>}/>
        <Route path='/study/result' element={<Result/>}/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
