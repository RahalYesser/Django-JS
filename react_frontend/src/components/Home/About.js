import React from 'react'
import about from '../../assets/images/about.svg'
const About = () => {
  return (
    <>
       {/*  <!--====== ABOUT PART START ======--> */}

<section id="about" className="about_area pt-120 relative">
    <div className="about_image flex items-end justify-end">
        <div className="image lg:pr-13">
            <img src={about} alt="about"/>
        </div>
    </div> {/* <!-- about image --> */}
    <div className="container">
        <div className="row justify-end">
            <div className="w-full lg:w-1/2">
                <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15">
                    <div className="section_title pb-9">
                        <h5 className="sub_title">Why Choose Us</h5>
                        <h4 className="main_title">Your Goal is Our Achievement</h4>
                    </div> 
                    <p>Our platform connects you with experienced self-employed experts. Browse services, compare profiles, and choose the right professional for your job today! </p>
                    <ul className="about_list pt-3">
                        <li className="flex mt-5">
                            <div className="about_check">
                                <i className="lni lni-checkmark-circle"></i>
                            </div>
                            <div className="about_list_content pl-5 pr-2">
                                <p>Our platform offers a wide range of services provided by experienced self-employed experts.</p>
                            </div>
                        </li>
                        <li className="flex mt-5">
                            <div className="about_check">
                                <i className="lni lni-checkmark-circle"></i>
                            </div>
                            <div className="about_list_content pl-5 pr-2">
                                <p>You can easily compare profiles of professionals to find the perfect match for your job.</p>
                            </div>
                        </li>
                        <li className="flex mt-5">
                            <div className="about_check">
                                <i className="lni lni-checkmark-circle"></i>
                            </div>
                            <div className="about_list_content pl-5 pr-2">
                                <p>Choose the right professional for your needs today and get your job done hassle-free!</p>
                            </div>
                        </li>
                    </ul>
                </div> 
            </div>
        </div> 
    </div> 
</section>

{/* <!--====== ABOUT PART ENDS ======--> */}

    </>
  )
}

export default About