import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './Home';
import ForkMe from './components/ForkMe';

function App() {
  return (
    <div>
      <NavBar/>
      <ForkMe/>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
