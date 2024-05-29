import React, { useState, useEffect }from 'react'
import logo1 from '../assets/images/WorkWave.png'
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'

const Topbar_profil = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const handleLogout = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log(token);
          await axios.get('http://127.0.0.1:8000/logout/', {
            headers: {
                Authorization: `Token ${token}`,
            },
            }).then((response) => {
                console.log(response.data);
            });
          localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

  return (
    <>
    <div className="navbar-area bg-gray shadow">
        <div className="container relative">
            <div className="row items-center">
                <div className="w-full">
                    <nav className="flex items-center justify-between py-4 navbar navbar-expand-lg">
                        <a className="navbar-brand mr-5" href="">
                            <img width="200" src={logo1} alt="Logo"/>
                        </a>
                        <div className="absolute left-0 z-20 w-full px-5 py-3 duration-300 bg-white lg:w-auto lg:block top-full mt-full lg:static lg:bg-transparent shadow lg:shadow-none" id="navbarOne">
                                <ul id="nav" className="items-center content-start mr-auto lg:justify-end navbar-nav lg:flex">
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll active" href="#home">Home</a>
                                    </li>
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll" href="#about">About</a>
                                    </li>
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll" href="#services">Services</a>
                                    </li>
                                  {/*   <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll" href="#work">Projects</a>
                                    </li>
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll" href="#pricing">Pricing</a>
                                    </li>
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll" href="#blog">Blog</a>
                                    </li> */}
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <a className="page-scroll" href="#contact">Contact</a>

                                    </li>                            
                                    {/* <!-- Profile dropdown --> */}
                                    <div className="nav-item ml-8">
                                    <div>
                                        <button
                                        type="button"
                                        className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        id="user-menu-button"
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        onClick={toggleMenu}
                                        >
                                        <span className="-inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        </button>
                                    </div>

                                    {isOpen && (
                                        <div
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex="-1"
                                        >
                                        <li className="nav-item mx-3 mt-2">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-0"
                                        >
                                            Your Profile
                                        </a>
                                        </li>
                                        <li className="nav-item mx-3">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-1"
                                        >
                                            Settings
                                        </a>
                                        </li>
                                        <li className="nav-item mx-3 mb-2">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </a>
                                        </li>
                                        </div>
                                    )}
                                    </div>                       
                                   
                                </ul>
                            </div> 
                    </nav> 
                </div>
            </div> 
        </div>
    </div> 
    </>
  )
}

export default Topbar_profil