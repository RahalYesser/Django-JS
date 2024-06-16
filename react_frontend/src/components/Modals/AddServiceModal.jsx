import React, { useState } from "react";
import { Carousel, Alert } from "flowbite-react";
import axios from "axios";

const AddServiceModal = ({ onClose, onServiceAdded , user_id }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    files: [],
    tarif: "",
    entrepreneur: user_id,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData({
      ...formData,
      files: files,
    });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleClearImages = () => {
    setFormData({
      ...formData,
      files: [],
    });
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === "files") {
        for (let i = 0; i < formData.files.length; i++) {
          data.append("files", formData.files[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    console.log("Form data to be submitted:", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/services/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Service created successfully:", response.data);
      setAlert(true);
      setFormData({
        date: "",
        description: "",
        tarif: "",
        title: "",
        files: [],
        entrepreneur: user_id,
      });
      setErrors({});
      setTimeout(() => {
        setAlert(false);
        onServiceAdded();
        onClose();
      }, 1000); // Hide alert after 1 second
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
        console.error("400 error occurred:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleFileClick = () => {
    document.getElementById("files").click();
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
                  <h5 className="sub_title">SERVICE</h5>
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

              <div className="relative flex items-center flex-auto px-2">
                <div className="container w-full pb-3">
                  <div className="w-full rounded-xl">
                    <div className="w-full">
                      <div className="mx-2">
                        <div className="single_form mt-2">
                          <label htmlFor="title">Title</label>
                          <input
                            value={formData.title}
                            onChange={handleChange}
                            required
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Title"
                            className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                          />
                          {errors.title && (
                            <div className="error">{errors.title}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="w-full">
                        <div className="mx-2">
                          <div className="single_form mt-2">
                            <label htmlFor="date">Date</label>
                            <input
                              value={formData.date}
                              onChange={handleChange}
                              required
                              name="date"
                              id="date"
                              type="date"
                              className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                            />
                            {errors.date && (
                              <div className="error">{errors.date}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="mx-2">
                          <div className="single_form mt-2">
                            <label htmlFor="tarif">Tariff</label>
                            <input
                              value={formData.tarif}
                              onChange={handleChange}
                              required
                              name="tarif"
                              id="tarif"
                              type="text"
                              placeholder="Tariff"
                              className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                            />
                            {errors.tarif && (
                              <div className="error">{errors.tarif}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="mx-2">
                        <div className="single_form mt-2">
                          <label htmlFor="description">Description</label>
                          <textarea
                            value={formData.description}
                            onChange={handleChange}
                            required
                            name="description"
                            id="description"
                            placeholder="Description"
                            className="w-full rounded-md py-4 px-6 border border-solid border-body-color"
                          ></textarea>
                          {errors.description && (
                            <div className="error">
                              This field may not be blank.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {imagePreviews.length > 0 ? (
                  <div id="add-photos" className="container w-full">
                    <div className="images-1 m-2 sm:h-64 xl:h-80 2xl:h-96 w-full">
                      <Carousel pauseOnHover>
                        {imagePreviews.map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            width="200"
                            alt={`Preview ${index}`}
                          />
                        ))}
                      </Carousel>
                    </div>
                    <button
                      type="button"
                      className="w-full justify-center m-2 px-4 py-2 bg-red-500 text-white rounded-lg"
                      onClick={handleClearImages}
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  /* {imagePreviews.length > 0 ? (
                <div className="w-full mt-5 flex flex-wrap justify-center">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      className="object-cover m-2"
                      width="200"
                      height="200"
                    />
                    
                  ))}
                </div> */
                  <div id="add-photos" className="container w-full md:w-1/2">
                    <div
                      onClick={handleFileClick}
                      className="single_services text-center my-2 mx-2"
                    >
                      <div className="services_icon">
                        <i className="lni lni-circle-plus"></i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="140"
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
                          Images
                        </h3>
                        {/* <p className="mt-4">I'm a client, hiring for a pro for job</p> */}
                      </div>
                      <input
                        name="files"
                        id="files"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
                <button onClick={handleSubmit} className="form-btn">
                  Add Service
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
          {alert && (
            <Alert color="success" className="fixed bottom-1">
              <span className="font-bold">Service added successfully.</span>
            </Alert>
          )}
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </form>
    </>
  );
};

export default AddServiceModal;
