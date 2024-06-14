import React, { useState } from "react";
import IMG from "../../assets/images/utilisateur.png";
import { FaPen } from "react-icons/fa";

const EditProfilModal = ({ onClose,user }) => {

  const [userIMG, setUserIMG] = useState(IMG);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    tel: '',
    gender:'',
    adresse: '',
    email: '',
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      const imageUrl = URL.createObjectURL(file);
      setUserIMG(imageUrl);
    }
  };

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
                  <h5 className="sub_title">EDIT PROFIL</h5>
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
              <div className="flex items-center lg:flex-row md:flex-col-reverse sm:flex-col-reverse m-3">
                <div className="">
                  <div className="w-full px-4 pb-3">
                    <div className="w-full rounded-xl">
                      
                      <div className="row">
                        <div className="w-full md:w-1/2">
                          <div className="mx-2">
                            <div className="single_form mt-2">
                              <label htmlFor="date">First name</label>
                              <input
                                value={user.firstName}
                                required
                                name="date"
                                id="date"
                                type="text"
                                placeholder="First name"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                              />
                              {/*  {errors.date && (
                              <div className="error">{errors.date}</div>
                            )} */}
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <div className="mx-2">
                            <div className="single_form mt-2">
                              <label htmlFor="tarif">Last name</label>
                              <input
                                value={user.lastName}
                                required
                                name="tarif"
                                id="tarif"
                                type="text"
                                placeholder="Last name"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                              />
                              {/*  {errors.tarif && (
                              <div className="error">{errors.tarif}</div>
                            )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="w-full md:w-1/2">
                          <div className="mx-2">
                            <div className="single_form mt-2">
                              <label htmlFor="tel">Phone</label>
                              <input
                                value={user.tel}
                                required
                                name="tel"
                                id="tel"
                                type="text"
                                placeholder="Phone"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                              />
                              {/*  {errors.tarif && (
                              <div className="error">{errors.tarif}</div>
                            )} */}
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <div className="mx-2">
                            <div className="single_form mt-2">
                            <label htmlFor="gender">Gender</label>
                                <select
                                required
                                name="gender"
                                id="gender"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                                >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="prefer_not_to_say">
                                    Prefer not to say
                                </option>
                                </select>
                                {/* {errors.gender && (
                                        <div className="error">{errors.gender}</div>
                                    )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="w-full md:w-1/2">
                          <div className="mx-2">
                            <div className="single_form mt-2">
                              <label htmlFor="email">Email</label>
                              <input
                                value={user.email}
                                required
                                name="email"
                                id="email"
                                type="text"
                                placeholder="Email"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                              />
                              {/*  {errors.date && (
                              <div className="error">{errors.date}</div>
                            )} */}
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/2">
                          <div className="mx-2">
                            <div className="single_form mt-2">
                              <label htmlFor="tel">Phone</label>
                              <input
                                value={user.tel}
                                required
                                name="tel"
                                id="tel"
                                type="text"
                                placeholder="Phone"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                              />
                              {/*  {errors.tarif && (
                              <div className="error">{errors.tarif}</div>
                            )} */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="mx-2">
                          <div className="single_form mt-2">
                            <label htmlFor="description">About me</label>
                            <textarea
                              required
                              name="description"
                              id="description"
                              placeholder="About me"
                              className="w-full rounded-md py-4 px-6 border border-solid border-body-color"
                            ></textarea>
                            {/* {errors.description && (
                            <div className="error">
                              This field may not be blank.
                            </div>
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative pr-3">
                  <div className="w-64 h-64 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src={userIMG}
                      alt="User"
                      className="w-64 h-64 object-cover"
                    />
                  </div>
                  <label className="cursor-pointer absolute bottom-0 right-0 p-2 bg-gray-800 text-white rounded-full">
                    <FaPen />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              {/* <div className='uppercase'>
                {user.user_type}
            </div> */}

              {/*footer*/}
              <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                {/*  <button className="form-btn">
                Save Changes
              </button> */}

                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>
    </>
  );
};

export default EditProfilModal;
