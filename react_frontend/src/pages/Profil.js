import React, { useState, useEffect } from "react";
import "../App.css";
import Topbar_profil from "../components/Topbar_profil";
import Footer from "../components/Home/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import ServicesBySelfEpmoyed from "../components/Services/ServicesBySelfEpmoyed";
import userIMG from "../assets/images/utilisateur.png"
import { FaPen } from "react-icons/fa";
import EditProfilModal from "../components/Modals/EditProfilModal";
import DemandesByClient from "../components/Services/DemandesByClient";

const Profil = () => {
  const [ user, setUser] = useState(false);
  const { username } = useParams();
  //const  [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageUrl = user.photo ? user.photo : userIMG;
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

   const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/get_current_user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUser(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error.message);
    }
  };

   useEffect(() => {  
     fetchCurrentUser();
   },[]);  

  

  if (!user) {
    return <h1 >Loading...</h1>;
  }

  return (
    <>
      <Topbar_profil user={user}/> 

      <div className="bg-gray-100 mt-14">
        <div className="profile mx-auto py-12">
          <div className="grid lg:grid-cols-12 sm:grid-cols-12 gap-6 px-2">
            <div className="lg:col-span-3 sm:col-span-full md:col-span-full">
              <div className="bg-gray shadow rounded-lg p-6">
                <div className="flex flex-col items-center ">
                  
                  <img
                    src={imageUrl}
                    className="w-48 h-48 bg-gray-300 rounded-full mb-2"
                  ></img>
                  <h1 className="text-xl font-bold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-700">username: {username}</p>
                    
                  <div className="mt-6  flex flex-col gap-2 items-center">
                    <a onClick={toggleModal} className="form-btn">
                      <span className="pr-3">Edit</span> <FaPen/>
                    </a>
                    <div className="uppercase justify-center">
                      <p>{user.user_type}</p>
                    </div>
                    {user.domaine && (<div className="title-1">
                      <p>{user.domaine}</p>
                    </div> )} 
                   
                     {isModalOpen && (
                      <EditProfilModal
                      user={user}
                      onProfilUpdated={fetchCurrentUser}                      
                      onClose={toggleModal}
                      />
                    )}  
        
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Phone
                  </span>
                  <ul>
                    <li className="mb-2"><span className="p-1 bg-gray-200">+216</span> {user.tel}</li>
                  </ul>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Adresse
                  </span>
                  <ul>
                    <li className="mb-2"> Region : {user.region}</li>
                    <li className="mb-2"> City : {user.city}</li>
                    <li className="mb-2"> Street : {user.street}</li>
                    <li className="mb-2"> Postal code : {user.postalcode}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-9 sm:col-span-full md:col-span-full">
              <div className="bg-gray shadow rounded-lg p-6">
                
                {user.user_type === 'auto_entrepreneur' && (
                 <div>
                  <h2 className="text-xl font-bold">MY SERVICES</h2>
                  <div className="mb-6">            
                      <ServicesBySelfEpmoyed user={user} ></ServicesBySelfEpmoyed>                
                  </div>
                </div>
                )}

                {user.user_type === 'client' && (
                 <div>
                  <h2 className="text-xl font-bold">MY DEMANDES</h2>
                  <div className="mb-6"> 
                    <DemandesByClient user={user}></DemandesByClient>           
                  </div>
                </div>
                )}
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="gallery" className="relative w-full" data-carousel="slide"></div>

      <Footer />
    </>
  );
};

export default Profil;
