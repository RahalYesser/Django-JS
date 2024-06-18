import React, { useEffect, useState } from "react";
import axios from "axios";
import AddServiceModal from "../Modals/AddServiceModal";
import { Carousel } from "flowbite-react";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import { Link } from "react-router-dom";
import EditServiceModal from "../Modals/EditServiceModal";

const AllServices = ({ user }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setItemToDelete(null);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setItemToEdit(null);
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      //console.log(user.id);
      const response = axios.get(
        `http://127.0.0.1:8000/services-by-entrepreneur/${user.id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setServices((await response).data);
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/services/${itemToDelete.id}/`);
      setServices(services.filter((service) => service.id !== itemToDelete.id));
      toggleDeleteModal();
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <>
      <div className="team-wrapper relative">
        <div className="row">
          {/* Services */}
          <section className="w-full service_area" id="about">
            <div className="container">
              <div className="row">
                <div onClick={toggleAddModal} className="w-full">
                  <div className="single_services text-center mt-8 mx-3">
                    <div className="services_icon">
                      <i className="lni lni-circle-plus"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="94"
                        height="92"
                        viewBox="0 0 94 92"
                      >
                        <path
                          className="services_shape"
                          id="Polygon_12"
                          data-name="Polygon 12"
                          d="M42.212,2.315a11,11,0,0,1,9.576,0l28.138,13.6a11,11,0,0,1,5.938,7.465L92.83,54.018A11,11,0,0,1,90.717,63.3L71.22,87.842A11,11,0,0,1,62.607,92H31.393a11,11,0,0,1-8.613-4.158L3.283,63.3A11,11,0,0,1,1.17,54.018L8.136,23.383a11,11,0,0,1,5.938-7.465Z"
                        />
                      </svg>
                    </div>
                    <div className="services_content mt-5">
                      <h3 className="services_title text-black font-semibold text-xl md:text-3xl">
                        Add service
                      </h3>
                      {/* <p className="mt-4">I'm a client, hiring for a pro for job</p> */}
                    </div>
                  </div>
                </div>
                {isAddModalOpen && (
                  <AddServiceModal
                    user_id={user.id}
                    onClose={toggleAddModal}
                    onServiceAdded={fetchServices}
                  />
                )}
              </div>
            </div>
          </section>
          {/* <AllServices></AllServices> */}
          {error && <div className="error">{error}</div>}

          {services.map((service) => (
            <div key={service.id} className="w-full lg:w-4/12">
              <div className="single_team_item mx-auto">
                <div className="single_team mx-3">
                  <div className="team_image relative">
                    <div className="sm:h-64 xl:h-80 2xl:h-96 w-full">
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

                    <ul className="social absolute top-4 right-17">
                      <li>
                        <Link to={`/${user.username}/services/${service.id}`}>
                          <i className="lni lni-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <a onClick={() => handleEditClick(service)}>
                          <i className="lni lni-pencil"></i>
                        </a>
                      </li>

                      <li>
                        <a
                          className="cursor-pointer"
                          onClick={() => handleDeleteClick(service)}
                        >
                          <i className="lni lni-trash"></i>
                        </a>
                      </li>
                      {isDeleteModalOpen && (
                        <ConfirmDeleteModal
                          onClose={toggleDeleteModal}
                          onDeleted={deleteService}
                          item={"service"}
                        />
                      )}
                    </ul>
                  </div>
                  <div className="team_content py-5 px-8 relative">
                    <h4 className="team_name text-xl md:text-2xl">
                      <a className="text-black group-hover:text-white">
                        {service.title}
                      </a>
                    </h4>
                    <p className="mt-2 transition-all duration-300 group-hover:text-white">
                      {service.tarif} $
                    </p>
                  </div>
                </div>
                {/* <!-- single team --> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isEditModalOpen && (
        <EditServiceModal
          service={itemToEdit}
          onClose={toggleEditModal}
          onServiceUpdated={fetchServices}
          user_id={user.id}
        />
      )}
    </>
  );
};

export default AllServices;
