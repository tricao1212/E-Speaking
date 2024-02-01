import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './pages/Admin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/admin/*' element={<Admin/>}/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
