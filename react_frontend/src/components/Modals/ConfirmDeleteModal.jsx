import React from 'react'
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle,RiDeleteBin6Line } from "react-icons/ri";

const ConfirmDeleteModal = ({onClose,onServiceDeleted}) => {
  
 
  return (
    <>

      <form className="w-full" id="contact-form">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">    
              <div className="section_title text-center">
                <h5 className="sub_title">DELETE SERVICE</h5>
              </div>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='m-3'>
            <RiDeleteBin6Line className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this service ?
            </h3>
              {/*   <a >
                              <i className="lni lni-trash" ></i>
                 </a>  */}
            </div>
           
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                No, cancel
              </button>
              <button onClick={onServiceDeleted} className="form-btn">
                Yes, i'm sure
              </button>

              {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Save Changes
                  </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>

     {/* <Modal show={onClose} onClose={onClose} size="md" >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
           {/*  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> 
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this service?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteService}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  )
}

export default ConfirmDeleteModal