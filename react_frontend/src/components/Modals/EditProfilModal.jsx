import React, { useState } from "react";
import IMG from "../../assets/images/utilisateur.png";
import { FaPen } from "react-icons/fa";

const EditProfilModal = ({ onClose,user }) => {
  const [errors, setErrors] = useState({});
  const [userIMG, setUserIMG] = useState(IMG);
  const [formData, setFormData] = useState({
    first_name: user.firstName,
    last_name: user.lastName,
    tel: user.tel,
    region: user.region,
    city: user.city,
    street: user.street,
    postalcode: user.postalcode,
    domaine: user.domaine,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                            <div className="single_form section_title mt-2">
                              <label className="title" htmlFor="first_name">First name</label>
                              <input
                                onChange={handleChange}
                                value={formData.first_name}
                                required
                                name="first_name"
                                id="first_name"
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
                            <div className="single_form section_title mt-2">
                              <label className="title" htmlFor="last_name">Last name</label>
                              <input
                                onChange={handleChange}
                                value={formData.last_name}
                                required
                                name="last_name"
                                id="last_name"
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
                            <div className="single_form section_title mt-2">
                              <label className="title" htmlFor="tel">Phone</label>
                              <input
                                onChange={handleChange}
                                value={formData.tel}
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
                            <div className="single_form section_title mt-2">
                            <label className="title" htmlFor="gender">Gender</label>
                                <select
                                onChange={handleChange}
                                required
                                name="gender"
                                id="gender"
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                                >
                                <option defaultValue="">-- Select Gender --</option>
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
                            <div className="single_form section_title mt-2">
                              <label className="title" htmlFor="email">Email</label>
                              <input
                                onChange={handleChange}
                                value={formData.email}
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
                            <div className="single_form section_title mt-2">
                              <label className="title" htmlFor="domaine">Domaine</label>
                              <input
                                onChange={handleChange}
                                value={formData.domaine}
                                required
                                name="domaine"
                                id="domaine"
                                type="text"
                                placeholder="Domaine"
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
                    <div className="single_form section_title mt-2">
                      <label className="title" htmlFor="region">
                        Region
                      </label>
                      <span style={{ color: "red" }}> *</span>
                      <select
                        value={formData.region}
                        onChange={handleChange}
                        required
                        name="region"
                        id="address_region"
                        className="w-full select-1 rounded-md px-6 border border-solid border-body-color"
                      >
                        <option defaultValue="">-- Select your region --</option>
                        <option value="ariana">Ariana</option>
                        <option value="beja">Beja</option>
                        <option value="ben-arous">Ben Arous</option>
                        <option value="bizerte">Bizerte</option>
                        <option value="gabes">Gabes</option>
                        <option value="gafsa">Gafsa</option>
                        <option value="jendouba">Jendouba</option>
                        <option value="kairouan">Kairouan</option>
                        <option value="kasserine">Kasserine</option>
                        <option value="kebili">Kebili</option>
                        <option value="kef">Kef</option>
                        <option value="mahdia">Mahdia</option>
                        <option value="manouba">Manouba</option>
                        <option value="medenine">Medenine</option>
                        <option value="monastir">Monastir</option>
                        <option value="nabeul">Nabeul</option>
                        <option value="sfax">Sfax</option>
                        <option value="sidi-bouzid">Sidi Bouzid</option>
                        <option value="siliana">Siliana</option>
                        <option value="sousse">Sousse</option>
                        <option value="tataouine">Tataouine</option>
                        <option value="tozeur">Tozeur</option>
                        <option value="tunis">Tunis</option>
                        <option value="zaghouan">Zaghouan</option>
                      </select>
                      {errors.adresse && (
                      <div className="error">{errors.adresse}</div>
                    )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="mx-2">
                    <div className="single_form section_title mt-2">
                      <label className="title" htmlFor="city">
                        City
                      </label>
                      <select
                        value={formData.city}
                        onChange={handleChange}
                        name="city"
                        id="address_city"
                        className="w-full select-1 rounded-md px-6 border border-solid border-body-color"
                      >
                        <option defaultValue="">-- Select your city --</option>
                        <option value="ElAlia">EL ALIA</option>
                        <option value="city2">City 2</option>
                        <option value="city3">City 3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="w-full md:w-8/12">
                  <div className="mx-2">
                    <div className="single_form section_title mt-2">
                      <label className="title" htmlFor="street">
                        Street
                      </label>
                      <input
                      value={formData.street}
                      onChange={handleChange}
                        name="street"
                        id="address_street"
                        type="text"
                        placeholder="Street"
                        className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-4/12">
                  <div className="mx-2">
                    <div className="single_form section_title mt-2">
                      <label className="title" htmlFor="postalcode">
                        Postal code
                      </label>
                      <input
                      value={formData.postalcode}
                      onChange={handleChange}
                        name="postalcode"
                        id="postal_code"
                        type="text"
                        placeholder="Postal Code"
                        className="w-full input-1 rounded-md px-6 border border-solid border-body-color"
                      />
                    </div>
                  </div>
                </div>
              </div>
                      <div className="w-full">
                        <div className="mx-2">
                          <div className="single_form section_title mt-2">
                            <label className="title" htmlFor="description">About me</label>
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
