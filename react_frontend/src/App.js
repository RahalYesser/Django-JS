import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './assets/css/tailwindcss.css'
import './assets/css/animate.css'
import './assets/fonts/lineicons/font-css/LineIcons.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home'
import Signupas from './pages/Authentfication/Signupas';
import Login from './pages/Authentfication/Login';
import SignupasClient from './pages/Authentfication/SignupasClient';
import SignupasSelfEmployed from './pages/Authentfication/SignupasSelfEmployed';
import Profil from './pages/Profil';
import PrivateRoute from './components/PrivateRoute'
import AllServices from './pages/AllServices';
import ServiceById from './components/Services/ServiceById';


const App= () => {
 /*  const [user, setUser] = useState(null);
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/get_current_user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTimeout(() => {
        setUser(response.data);
      }, 1000);
      //setUser(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []); */

  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path='/signupas' element={<Signupas/>}></Route>
          <Route path='/signupas/client' element={<SignupasClient/>}></Route>
          <Route path='/signupas/self-employed' element={<SignupasSelfEmployed/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/:username/profile' element={<Profil/>}></Route>
            <Route path='/:username/allservices' element={<AllServices/>}></Route>
            <Route path='/:username/services/:service_id' element={<ServiceById/>}></Route>
          </Route>                 
         </Route>   
       </Routes>
     </BrowserRouter>
    </>
   );
}



export default App;
