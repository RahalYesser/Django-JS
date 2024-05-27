import React from 'react'
import logo1 from '../assets/images/WorkWave.png'

const Topbar = () => {
  return (
    <>
        <div className="navbar-area bg-white">
            <div className="container relative">
                <div className="row items-center">
                    <div className="w-full">
                        <nav className="flex items-center justify-between py-4 navbar navbar-expand-lg">
                            <a className="navbar-brand mr-5" href="">
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