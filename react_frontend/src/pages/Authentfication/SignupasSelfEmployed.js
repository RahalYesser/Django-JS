import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SignupasSelfEmployed = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    tel: "",
    region: "",
    city: "",
    street: "",
    postalcode: "",
    domaine: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username =
      `${formData.first_name}${formData.last_name}`.toLowerCase();
    const dataToSubmit = {
      user: {
        username,
        email: formData.email,
        password: formData.password,
      },
      domaine: formData.domaine,
      firstName: formData.first_name,
      lastName: formData.last_name,
      tel: formData.tel,
      disponibilite: "Full time",
      adresse: {
        region:formData.region,
        city:formData.city,
        street:formData.street,
        postalcode:formData.postalcode,
      },
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/entreproneursignup/",
        dataToSubmit
      );
      console.log("Response:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate(`/${username}/profile`);
    } catch (error) {
      console.error("There was an error!", error.response.data);
      setErrors(error.response.data);
    }
  };
  return (
    <>
      <Topbar />
      <section className="">
        <div className="container pt-120 pb-6">
          <form
            className="row justify-center "
            onSubmit={handleSubmit}
            id="contact-form"
          >
            <div className="w-full lg:w-6/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
              <div className="w-full pt-4">
                <div className="section_title text-center pb-3">
                  <h5 className="sub_title">Sign up as Self-Employed</h5>
                </div>
              </div>
              <div className="row">
                <div className="w-full md:w-1/2">
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
                      <label className="title" htmlFor="first_name">
                        First name
                      </label>{" "}
                      <span style={{ color: "red" }}> *</span>
                      <input
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        name="first_name"
                        id="first_name"
                        type="text"
                        placeholder="First Name"
                        className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                      />
                      {errors.firstName && (
                        <div className="error">{errors.firstName}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
                      <label className="title" htmlFor="last_name">
                        Last name
                      </label>{" "}
                      <span style={{ color: "red" }}> *</span>
                      <input
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        name="last_name"
                        id="last_name"
                        type="text"
                        placeholder="Last Name"
                        className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                      />
                      {errors.lastName && (
                        <div className="error">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="w-full md:w-1/2">
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
                      <label required className="title" htmlFor="tel">
                        Phone
                      </label>
                      <span style={{ color: "red" }}> *</span>
                      <input
                        value={formData.tel}
                        onChange={handleChange}
                        required
                        name="tel"
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                      />
                      {errors.lastName && (
                        <div className="error">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
                    <label className="title " htmlFor="domaine">
                      Domain :
                    </label>
                    <span style={{ color: "red" }}> *</span>
                    <select
                      onChange={handleChange}
                      value={formData.domaine}
                      required
                      name="domaine"
                      id="domaine"
                      className="w-full select-1 rounded-md px-6 border border-solid border-body-color"
                    >
                      <option value=""> -- Select domain --</option>
                      <option value="carpenter">Carpenter</option>
                      <option value="electrician">Electrician</option>
                      <option value="plumber">Plumber</option>
                      <option value="painter">Painter</option>
                      <option value="bricklayer">Bricklayer</option>
                      <option value="metalworker">Metalworker</option>
                      <option value="mechanic">Mechanic</option>
                    </select>
                    {errors.domaine && (
                        <div className="error">{errors.domaine}</div>
                      )}
                      {/* <label required className="title" htmlFor="domaine">
                        Domaine
                      </label>
                      <span style={{ color: "red" }}> *</span>
                      <input
                        value={formData.domaine}
                        onChange={handleChange}
                        required
                        name="domaine"
                        id="domaine"
                        type="text"
                        placeholder="Domaine"
                        className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                      />
                      {errors.domaine && (
                        <div className="error">{errors.domaine}</div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="w-full md:w-1/2">
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
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
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
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
                        <option value="El Alia">EL ALIA</option>
                        <option value="Ras Jbal">Ras Jbal</option>
                        <option value="Metline">Metline</option>
                        <option value="bizerte sud">Bizerte sud</option>
                        <option value="bizerte sud">Bizerte nord</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="w-full md:w-8/12">
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
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
                  <div className="mx-4">
                    <div className="single_form section_title mt-5">
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
                        className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mx-4">
                  <div className="single_form section_title mt-5">
                    <label className="title" htmlFor="email">
                      Email
                    </label>{" "}
                    <span style={{ color: "red" }}> *</span>
                    <input
                      required
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                    />
                    {errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mx-4">
                  <div className="single_form section_title mt-5">
                    <label className="title" htmlFor="password">
                      Password
                    </label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      required
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                    />
                    {errors.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="mx-4">
                  <div className="single_form section_title mt-5">
                    <input
                      required
                      type="checkbox"
                      id="terms"
                      name="terms"
                      value="agreed"
                    />
                    <label htmlFor="terms">
                      {" "}
                      Yes, I understand and agree to the WorkWave Terms of
                      Service, including the User Agreement and Privacy Policy.
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full row justify-center">
                <div className="mx-4">
                  <div className="single_form mt-5">
                    <button type="submit" className="form-btn">
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full row justify-center ">
                <div className="row justify-center pt-6">
                  <h6>Already have an account? </h6>{" "}
                  <Link to="/login" className="pl-2 section_title">
                    <h6 className="title">Log in</h6>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignupasSelfEmployed;
