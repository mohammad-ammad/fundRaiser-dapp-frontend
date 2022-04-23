import './App.css';
import MyApp from './MyApp';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AllCampaign from './components/AllCampaign';
import Donate from './components/Donate';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <div className='container my-5'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/campaigns' element={<AllCampaign/>}/>
            <Route path='/campaign/:address' element={<Donate/>}/>
          </Routes>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
