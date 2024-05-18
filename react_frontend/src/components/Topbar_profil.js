import React, { useState, useEffect }from 'react'
import logo1 from '../assets/images/WorkWave.png'

const Topbar_profil = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
    <div class="navbar-area bg-gray shadow">
        <div class="container relative">
            <div class="row items-center">
                <div class="w-full">
                    <nav class="flex items-center justify-between py-4 navbar navbar-expand-lg">
                        <a class="navbar-brand mr-5" href="">
                            <img width="200" src={logo1} alt="Logo"/>
                        </a>
                        <div class="absolute left-0 z-20 w-full px-5 py-3 duration-300 bg-white lg:w-auto lg:block top-full mt-full lg:static lg:bg-transparent shadow lg:shadow-none" id="navbarOne">
                                <ul id="nav" class="items-center content-start mr-auto lg:justify-end navbar-nav lg:flex">
                                    <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll active" href="#home">Home</a>
                                    </li>
                                    <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll" href="#about">About</a>
                                    </li>
                                    <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll" href="#services">Services</a>
                                    </li>
                                  {/*   <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll" href="#work">Projects</a>
                                    </li>
                                    <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll" href="#pricing">Pricing</a>
                                    </li>
                                    <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll" href="#blog">Blog</a>
                                    </li> */}
                                    <li class="nav-item ml-5 lg:ml-11">
                                        <a class="page-scroll" href="#contact">Contact</a>
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
                                        <li class="nav-item mx-3 mt-2">
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
                                        <li class="nav-item mx-3">
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
                                        <li class="nav-item mx-3 mb-2">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
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