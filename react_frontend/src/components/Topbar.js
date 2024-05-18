import React from 'react'
import logo1 from '../assets/images/WorkWave.png'

const Topbar = () => {
  return (
    <>
    <div class="navbar-area bg-white">
            <div class="container relative">
                <div class="row items-center">
                    <div class="w-full">
                        <nav class="flex items-center justify-between py-4 navbar navbar-expand-lg">
                            <a class="navbar-brand mr-5" href="">
                                <img width="200" src={logo1} alt="Logo"/>
                            </a>
                        </nav> 
                    </div>
                </div> 
            </div>
        </div> 
    </>
  )
}

export default Topbar