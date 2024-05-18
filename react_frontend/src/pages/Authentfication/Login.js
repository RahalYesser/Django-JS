import React from 'react'
import Topbar from '../../components/Topbar'

const Login = () => {
  return (
    <>
        <Topbar/>
        <section class="">
            
       
        <div class="container pt-120 pb-6">
            <form class="row justify-center " id="contact-form" action="" method="POST">
                <div class="w-full lg:w-4/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
                    <div class="w-full pt-4">
                        <div class="section_title text-center pb-3">
                            <h5 class="sub_title">Login to WorkWave</h5>
                        {/* <h4 class="main_title">Work Process</h4> */}
                        </div> 
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input height="12" name="email" id="email" type="email" placeholder="Email" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
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

                    <p class="form-message mx-5 mt-4">Forget password ?</p>
                
                    <div class="w-full row justify-center">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <button type="submit" class="form-btn">Login</button>
                            </div> 
                        </div>
                    </div>

                    <div class="w-full row justify-center ">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <p>Don't have a WorkWave account ?</p>
                            </div> 
                        </div>
                    </div>

                    <div class="w-full row justify-center pb-3">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <button type="submit" class="form-btn">Sign up</button>
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

export default Login