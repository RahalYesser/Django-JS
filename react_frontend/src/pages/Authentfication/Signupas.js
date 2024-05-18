import React from 'react'
import Topbar from '../../components/Topbar'
import { Link } from 'react-router-dom'

const Signupas = () => {
  return (
    <>
    <Topbar/> 
    <section class="services_area pt-120" id="about">
        <div class="container">
            <div class="row justify-center">
                <div class="w-full lg:w-1/2">
                    <div class="section_title text-center pb-3">
                        <h5 class="sub_title">Join as a client or a self-employed </h5>
                        {/* <h4 class="main_title">Work Process</h4> */}
                    </div> 
                </div>
            </div> 
            <div class="row justify-center">
                <div class="w-full sm:w-10/12 md:w-6/12 lg:w-4/12">
                    <Link to="client">                   
                    <div class="single_services text-center mt-8 mx-3">
                        <div class="services_icon">
                            <i class="lni lni-users"></i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="92" viewBox="0 0 94 92">
                                <path class="services_shape" id="Polygon_12" data-name="Polygon 12" d="M42.212,2.315a11,11,0,0,1,9.576,0l28.138,13.6a11,11,0,0,1,5.938,7.465L92.83,54.018A11,11,0,0,1,90.717,63.3L71.22,87.842A11,11,0,0,1,62.607,92H31.393a11,11,0,0,1-8.613-4.158L3.283,63.3A11,11,0,0,1,1.17,54.018L8.136,23.383a11,11,0,0,1,5.938-7.465Z" />
                            </svg>
        
                        </div>
                        <div class="services_content mt-5">
                            <h3 class="services_title text-black font-semibold text-xl md:text-3xl">Client</h3>
                            <p class="mt-4">I'm a client, hiring for a pro for job</p>
                        </div>
                    </div> 
                    </Link>
                </div>

                <div class="w-full sm:w-10/12 md:w-6/12 lg:w-4/12">
                    <Link to="self-employed">
                    <div class="single_services text-center mt-8 mx-3">
                        <div class="services_icon">
                            <i class="lni lni-briefcase"></i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="94" height="92" viewBox="0 0 94 92">
                                <path class="services_shape" id="Polygon_12" data-name="Polygon 12" d="M42.212,2.315a11,11,0,0,1,9.576,0l28.138,13.6a11,11,0,0,1,5.938,7.465L92.83,54.018A11,11,0,0,1,90.717,63.3L71.22,87.842A11,11,0,0,1,62.607,92H31.393a11,11,0,0,1-8.613-4.158L3.283,63.3A11,11,0,0,1,1.17,54.018L8.136,23.383a11,11,0,0,1,5.938-7.465Z" />
                            </svg>
                        </div>
                        <div class="services_content mt-5">
                            <h3 class="services_title text-black font-semibold text-xl md:text-3xl">Self-employed</h3>
                            <p class="mt-4">I'm a self-employed, looking for work</p>
                        </div>
                    </div> 
                    </Link>
                </div>
            </div> 
            <div class="row justify-center pt-6">
                <h6>Already have an account? </h6> <Link to='/login' class="pl-2 section_title"><h6 class="title">Log in</h6></Link>
            </div>
        </div> 
    </section>
    </>
  )
}

export default Signupas