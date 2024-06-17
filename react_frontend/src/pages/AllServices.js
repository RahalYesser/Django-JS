import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar_profil from "../components/Topbar_profil";
import Footer from "../components/Home/Footer";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

const AllServices = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    region: "",
    domaine: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/get_current_user/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/services/");
      setServices(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
      setError(err);
    }
  };

  const fetchServicesByRegionAndDomain = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/services/by_region_and_domain/?region=${formData.region}&domaine=${formData.domaine}`
      );
      setServices(response.data);
      // Constructing the filter messages based on formData
      let newFilterMessages = [];
      /* if (formData.region && formData.domaine) {
        newFilterMessages.push(`Region : ${formData.region}`);
        newFilterMessages.push(`Domain : ${formData.domaine}`);
      } else */
      if (formData.region) {
        newFilterMessages.push(`Region  : ${formData.region}`);
      }
      if (formData.domaine) {
        newFilterMessages.push(`Domain : ${formData.domaine}`);
      }
      setMessages(newFilterMessages);

      /* let filterMessage = "Filtered by: ";
      if (formData.region && formData.domaine) {
        filterMessage += `region ${formData.region} and domain: ${formData.domaine}`;
      } else if (formData.region) {
        filterMessage += `in ${formData.region}`;
      } else if (formData.domaine) {
        filterMessage += `domain: ${formData.domaine}`;
      } else {
        filterMessage += "All services";
      } */
      console.log("reg-dom", response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchServices();
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Topbar_profil user={user} />

      <div className="bg-gray-100 pt-18">
        <div className="profile mx-auto py-12">
          <div className="grid lg:grid-cols-12 sm:grid-cols-12 gap-6 px-2">
            <div className="lg:col-span-3 sm:col-span-full md:col-span-full">
              <div className="bg-gray shadow rounded-lg">
                <div className="flex flex-col items-center ">
                  <div className="single_form section_title mt-3 mb-5 mx-5">
                    <h3 className="text-center">Filter by</h3>
                    <label className="title" htmlFor="region">
                      Region :
                    </label>
                    <select
                      onChange={handleChange}
                      value={formData.region}
                      required
                      name="region"
                      id="address_region"
                      className="w-full select-1 mb-2 rounded-md px-6 border border-solid border-body-color"
                    >
                      <option value=""> -- Select region --</option>
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
                    <label className="title " htmlFor="domaine">
                      Domain :
                    </label>
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
                    <div className="mt-4 flex flex-col items-center">
                      <div>
                        <a
                          onClick={fetchServicesByRegionAndDomain}
                          className="form-btn"
                        >
                          <span>Search</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Displaying filter messages */}
                  <div className="w-full">
                  {messages.length > 0 && (
                    <div className="filter-1 px-5 py-2 mx-5 mb-4">
                      <h4 className="text-center">Filtered by:</h4>
                      <ul className="">
                        {messages.map((message, index) => (
                          <li className="font-bold hover:text-theme-color" key={index}>{message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-9 sm:col-span-full md:col-span-full">
              <div className="bg-gray shadow rounded-lg p-4">
                <section id="service" className="work_area bg-gray">
                  <div className="container">
                    <div className="row justify-center">
                      <div className="w-full lg:w-1/2">
                        <div className="section_title text-center">
                          <h5 className="sub_title">Services</h5>
                          {/*                         <h4 className="main_title">Some of Our Recent Works</h4>
                           */}{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row justify-center">
                    {services.length === 0 && 
                    <div className="section_title text-center filter-1 mt-5 w-full py-2">
                      <h5>No services available.</h5>
                      {formData.region && 
                        <div className="font-bold hover:text-theme-color">
                          in {formData.region}
                        </div>
                      }

                      {formData.domaine && 
                        <div className="font-bold hover:text-theme-color">
                          domain : {formData.domaine}
                        </div>
                      }
                    </div>
                    }
                    {services.map((service) => (
                      <div
                        key={service.id}
                        class="w-full md:w-8/12 lg:w-6/12 xl:w-4/12"
                      >
                        <div className="single_blog mx-2 mt-4 rounded-xl bg-white transition-all duration-300 overflow-hidden hover:shadow-lg">
                          <div className="blog_image">
                            <div className="w-full sm:h-64 xl:h-80 2xl:h-96 ">
                              <Carousel pauseOnHover>
                                {service.files.map((file) => (
                                  <img
                                    key={file.id}
                                    src={file.file}
                                    alt={`File related to ${service.title}`}
                                  />
                                ))}
                              </Carousel>
                            </div>
                            {/* <img
                            src="assets/images/blog-3.jpg"
                            alt="blog"
                            class="w-full"
                          /> */}
                          </div>
                          <div className="blog_content p-4 md:p-4">
                            <ul className="blog_meta flex justify-between">
                              <li className="text-body-color text-sm md:text-base">
                                <a
                                  href="#"
                                  className="text-body-color hover:text-theme-color"
                                >
                                  {service.tarif} $
                                </a>
                              </li>
                              <li class="text-body-color text-sm md:text-base">
                                {service.date}
                              </li>
                            </ul>
                            <h3 className="blog_title">
                              <a href="#">{service.title}</a>
                            </h3>
                            <Link
                              to={`/${user.username}/services/${service.id}`}
                              className="more_btn"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="gallery" className="relative w-full" data-carousel="slide"></div>

      <Footer />
    </>
  );
};

export default AllServices;
