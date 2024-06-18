import React, { useState, useEffect } from "react";
import { Carousel, Alert } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Home/Footer";
import Topbar_profil from "../Topbar_profil";
import Feedback from "../Feedback";

const ServiceById = () => {
  const [user, setUser] = useState(null);
  //const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [service, setService] = useState(false);
  const [entrepreneur, setEntrepreuneur] = useState(false);
  const { service_id } = useParams();

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

  const getService = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/services/${service_id}/`
      );
      console.log(response.data);
      setService(response.data);
    } catch (err) {
      console.log(err.response.data);
      //setError(err);
    }
  };

  const getEntrepreneur = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/auto-entrepreneurs/${id}/`
      );
      console.log(response.data);
      setEntrepreuneur(response.data);
    } catch (err) {
      console.log(err.response.data);
      //setError(err);
    }
  };

  const demandeService = async () => {
    try {
      console.log('ser',service);
      const data = {
        client: user.id,
        service: service_id,
      };
      const response = await axios.post(
        "http://127.0.0.1:8000/demandes/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Demande created successfully:", response.data);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000); // Hide alert after 1 second
    } catch (error) {
      if (error.response && error.response.status === 400) {
        //setErrors(error.response.data);
        console.error("400 error occurred:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };


  useEffect(() => {
    fetchCurrentUser();
    const fetchServiceAndEntrepreneur = async () => {
      await getService();
    };
    fetchServiceAndEntrepreneur();
  }, [service_id]);

  useEffect(() => {
    if (service && service.entrepreneur) {
      getEntrepreneur(service.entrepreneur);
    }
  }, [service.entrepreneur]);

  if (!user || !service || !entrepreneur) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Topbar_profil user={user} />

      <div className="bg-gray shadow mx-3 mt-22">
        <div className="profile mx-auto py-3">
          <div className="grid lg:grid-cols-12 sm:grid-cols-12 gap-6 px-2">
            <div className="lg:col-span-4 sm:col-span-full md:col-span-full">
              <div className="bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="h-96 w-96 sm:h-64 xl:h-80 2xl:h-96 p-3">
                    <Carousel pauseOnHover>
                      {service.files &&
                        service.files.map((file) => (
                          <img
                            key={file.id}
                            src={file.file}
                            alt={`File related to ${service.title}`}
                          />
                        ))}
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 sm:col-span-full md:col-span-full">
              <div className="bg-gray shadow rounded-lg p-6">
                <div class="row justify-center">
                  <div class="w-full">
                    <div>
                      <div className="flex flex-row justify-between px-4 sm:px-0">
                        <h3 className="main_title">Service Information</h3>
                        {user.user_type === "client" && (
                          <div className="">
                            <a onClick={demandeService} className="form-btn">
                              <span>Demande</span>
                            </a>
                          </div>
                        )}
                        {user.username === entrepreneur.user.username && (
                          <div className="section_title">
                            <span className="">0</span>{" "}
                            <span className="sub_title">Demandes</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                              Title
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {service.title}
                            </dd>
                          </div>
                          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                              Date
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {service.date}
                            </dd>
                          </div>
                          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                              Added by
                            </dt>
                            {user.username === entrepreneur.user.username ? (
                              <dd className="text-theme-color mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                you
                              </dd>
                            ) : (
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {entrepreneur.user.username}
                              </dd>
                            )}
                          </div>
                          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                              Tarif
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              ${service.tarif}
                            </dd>
                          </div>
                          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                              About
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {service.description}
                            </dd>
                          </div>
                          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">
                              Attachments
                            </dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul
                                role="list"
                                className="divide-y divide-gray-100 rounded-md border border-gray-200"
                              >
                                {service.files.map(file => (
                                  <li
                                    key={file.id}
                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                  >
                                    <div className="flex w-0 flex-1 items-center">
                                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                        <span className="truncate font-medium">
                                          {file.file}
                                        </span>
                                        <span className="flex-shrink-0 text-gray-400">
                                          {file.size}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a
                                        href={file.file} // Assuming file.file is the URL of the file
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        download
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                              
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {user.username !== entrepreneur.user.username && (
                      <div className="mt-6">
                        <h4 className="main_title">Self-employed Details :</h4>
                        <p className="font-bold hover:text-theme-color">
                          Username: {entrepreneur.user.username}
                        </p>
                        <p className="font-bold hover:text-theme-color">
                          Name: {entrepreneur.firstName} {entrepreneur.lastName}
                        </p>
                        <p className="font-bold hover:text-theme-color">
                          Domaine: {entrepreneur.domaine}
                        </p>
                        <p className="font-bold hover:text-theme-color">
                          Region: {entrepreneur.adresse.region}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {alert && (
            <Alert color="success" className="fixed bottom-1">
              <span className="font-bold">Demande affected successfully.</span>
            </Alert>
          )}
        </div>
      </div>
      <div id="gallery" className="relative w-full" data-carousel="slide"></div>

      <Feedback user={user} service={service}/>
      <Footer />
    </>
  );
};

export default ServiceById;
