import React , {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import logo1 from '../assets/images/WorkWave.png'
import header_image from '../assets/images/header_image.png'
import shape1 from '../assets/images/shape/shape-1.svg'
import shape2 from '../assets/images/shape/shape-2.svg'
import shape3 from '../assets/images/shape/shape-3.svg'
import shape4 from '../assets/images/shape/shape-4.svg'
import cle from '../assets/images/cle.png'
import scie from '../assets/images/scie.png'
import rouleau from '../assets/images/rouleau.png'
import multimetre from '../assets/images/multimetre.png'

const Header = () => {

    useEffect(() => {
        const pageLinks = document.querySelectorAll('.page-scroll');

        pageLinks.forEach(elem => {
            elem.addEventListener('click', handleClick);
        });

        return () => {
            pageLinks.forEach(elem => {
                elem.removeEventListener('click', handleClick);
            });
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
	return ( 
		<>
			{/* <!--====== HEADER PART START ======--> */}
    <section className="header_area">
        <div className="navbar-area bg-white">
            <div className="container relative">
                <div className="row items-center">
                    <div className="w-full">
                        <nav className="flex items-center justify-between py-4 navbar navbar-expand-lg">
                            <a className="navbar-brand mr-5" href="">
                                <img width="240" src={logo1} alt="Logo"/>
                            </a>
                            <button className="block navbar-toggler focus:outline-none lg:hidden" type="button" data-toggle="collapse" data-target="#navbarOne" aria-controls="navbarOne" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="toggler-icon"></span>
                                <span className="toggler-icon"></span>
                                <span className="toggler-icon"></span>
                            </button>

                            <div className="absolute left-0 z-20 hidden w-full px-5 py-3 duration-300 bg-white lg:w-auto lg:block top-full mt-full lg:static lg:bg-transparent shadow lg:shadow-none" id="navbarOne">
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
                                    <li className="nav-item ml-5 lg:ml-11">
                                        <Link to="login"><button className="form-btn">Log in</button></Link>
                                        <Link to="signupas"><button className="form-btn">Sign up</button></Link>                               
                                    </li>
                                </ul>
                            </div> 
                        </nav> 
                    </div>
                </div> 
            </div>
        </div> 

        <div id="home" className="header_hero bg-gray relative z-10 overflow-hidden lg:flex items-center">
            <div className="hero_shape shape_1">
                <img src={multimetre} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_2">
                <img src={cle} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_3">
                <img src={scie} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_4">
                <img src={rouleau} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_6">
                <img src={multimetre} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_7">
                <img src={rouleau} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_8">
                <img src={scie} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_9">
                <img src={cle} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_10">
                <img src={rouleau} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_11">
                <img src={multimetre} alt="shape"/>
            </div>{/* <!-- hero shape --> */}
            <div className="hero_shape shape_12">
                <img src={cle} alt="shape"/>
            </div>{/* <!-- hero shape --> */}

            <div className="container">
                <div className="row">
                    <div className="w-full lg:w-1/2">
                        <div className="header_hero_content pt-150 lg:pt-0">
                            <h2 className="hero_title text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold">Find the Perfect Pro for Every <span className="text-theme-color">Job !</span></h2>
                            <p className="mt-8 lg:mr-8">Our platform connects you with experienced self-employed experts. Browse services, compare profiles, and choose the right professional for your job today!</p>
                            <div className="hero_btn mt-10">
                                <Link className="main-btn" to="signupas">Get Started</Link>
                            </div>
                        </div> {/* <!-- header hero content --> */}
                    </div>
                </div> {/* <!-- row --> */}
            </div> {/* <!-- container --> */}
            <div className="header_shape hidden lg:block"></div>

            <div className="header_image flex items-center">
                <div className="image 2xl:pl-25">
                    <img src={header_image} alt="Header Image"/>
                </div>
            </div> 
        </div> 
    </section>

    {/* <!--====== HEADER PART ENDS ======--> */}
		</>
	)
}

export default Header