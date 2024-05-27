import React from 'react';
import './App.css';
import './assets/css/tailwindcss.css'
import './assets/css/animate.css'
import './assets/fonts/lineicons/font-css/LineIcons.css'
//import './assets/css/tiny-slider.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home'
import Signupas from './pages/Authentfication/Signupas';
import Login from './pages/Authentfication/Login';
import Signupas_client from './pages/Authentfication/Signupas_client';
import Signupas_self_employed from './pages/Authentfication/Signupas_self_employed';
import Profil from './pages/Profil';
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/signupas' element={<Signupas/>}></Route>
          <Route path='/signupas/client' element={<Signupas_client/>}></Route>
          <Route path='/signupas/self-employed' element={<Signupas_self_employed/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/:username/profil' element={<Profil/>}></Route>
          </Route>
          {/* <PrivateRoute path="/profil" element={<Profil />} /> */}
          {/* <PrivateRoute path="/profil">
            <Profil />
          </PrivateRoute> */}
                  
         </Route>   
       </Routes>
     </BrowserRouter>
    </>
   );
}



export default App;
