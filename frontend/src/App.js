import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './pages/admin/Admin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Home';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import CheckRoute from './components/CheckRoute';
import Login from './pages/login/Login'
function App() {
  return (
    <AuthContextProvider>
      <CheckRoute />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Protected><Admin /></Protected>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
