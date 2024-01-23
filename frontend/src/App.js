import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './pages/Admin';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
    </Routes>
  );
}

export default App;
