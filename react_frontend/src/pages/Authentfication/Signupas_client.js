import React from 'react'
import Topbar from '../../components/Topbar'

const Signupas_client = () => {
  return (
    <>
        <Topbar/>
        <section class="">   
        <div class="container pt-120 pb-6">
            <form class="row justify-center " id="contact-form" action="" method="POST">
                <div class="w-full lg:w-6/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
                    <div class="w-full pt-4">
                        <div class="section_title text-center pb-3">
                            <h5 class="sub_title">Sign up as client</h5>
                        </div> 
                    </div>
                    <div class="row">
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="first_name" id="first_name" type="text" placeholder="First Name" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>                    
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="last_name" id="last_name" type="text" placeholder="Last Name" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="telephone" id="telephone" type="tel" placeholder="Telephone" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <select name="address_region" id="address_region" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color">
                                    <option value="" disabled selected>Region</option>
                                    <option value="region1">Bizerte</option>
                                    <option value="region2">Tunis</option>
                                    <option value="region3">Ariana</option>
                                    
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <select name="address_city" id="address_city" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color">
                                    <option value="" disabled selected>City</option>
                                    <option value="city1">EL ALIA</option>
                                    <option value="city2">City 2</option>
                                    <option value="city3">City 3</option>
                                </select>
                            </div> 
                        </div>
                    </div>

                    </div>
                    <div class="row">
                    <div class="w-full md:w-8/12">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="address_street" id="address_street" type="text" placeholder="Street" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full lg:w-4/12">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="postal_code" id="postal_code" type="text" placeholder="Postal Code" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="email" id="email" type="email" placeholder="Email" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="password" id="password" type="password" placeholder="Password" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input type="checkbox" id="terms" name="terms" value="agreed"/>
                                <label for="terms"> Yes, I understand and agree to the WorkWave Terms of Service, including the User Agreement and Privacy Policy.</label>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full row justify-center">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <button type="submit" class="form-btn">Sign up</button>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full row justify-center ">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <p>Already have a WorkWave account? <a href="#">Login here</a>.</p>
                            </div> 
                        </div>
                    </div>
                </div> 
            </form>
        </div> 
    </section>

    </>
  )
}

export default Signupas_client