import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './Home';
import ForkMe from './components/ForkMe';
import ProfileCard from './components/ProfileCard';
import Footer from './components/Footer';
import Error404 from './components/404';

function App() {
  return (
    <div>
      <NavBar/>
      <ForkMe/>
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/profile-card' element={<ProfileCard/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;
