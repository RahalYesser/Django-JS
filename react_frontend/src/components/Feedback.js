import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaStar, FaPlus } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import axios from "axios";

const options = [
  { value: "1", label: <FaStar className="text-yellow" /> },
  {
    value: "2",
    label: (
      <>
        {" "}
        <div className="flex flex-row">
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
        </div>{" "}
      </>
    ),
  },
  {
    value: "3",
    label: (
      <>
        {" "}
        <div className="flex flex-row">
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
        </div>
      </>
    ),
  },
  {
    value: "4",
    label: (
      <>
        {" "}
        <div className="flex flex-row">
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
        </div>
      </>
    ),
  },
  {
    value: "5",
    label: (
      <>
        {" "}
        <div className="flex flex-row">
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
          <FaStar className="text-yellow" />
        </div>
      </>
    ),
  },
];

const Feedback = ({ user, service }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    client: user.id,
    service: service.id,
    rate: 0,
    message: "",
  });

  const getFeedbacksByService = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/feedbacks-by-service/${service.id}/`
      );
      console.log(response.data);
      setFeedbacks(response.data);
    } catch (err) {
      console.log(err.response.data);
      //setError(err);
    }
  };

  const handleOption = (selectedOption) => {
    formData.rate = selectedOption.value;
    console.log("Rate", selectedOption.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 0; i < rate; i++) {
      stars.push(<FaStar key={i} className="text-yellow" />);
    }
    return stars;
  };

  const renderDate = (d) => {
    // Create a Date object from the timestamp
    const date = new Date(d);

    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns zero-based month
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the date and time
    const formattedDateTime = `${day}/${month}/${year} at ${hours}:${minutes}`;
    return formattedDateTime;
  };

  const addFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/feedbacks/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Service created successfully:", response.data);
      setFormData({
        client: user.id,
        service: service.id,
        rate: "",
        message: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("400 error occurred:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    getFeedbacksByService();
  }, []);

  return (
    <>
      {user.user_type === "client" && (
        <article className="bg-gray shadow m-3 p-3">
          <div class="flex items-center mb-4">
            <img
              class="w-10 h-10 me-4 rounded-full"
              src={user.photo}
              alt={user.username}
            />
            <div className="font-bold hover:text-theme-color">
              <p>
                {user.firstName} {user.lastName} <AiOutlineComment />
              </p>
            </div>
          </div>
          <div class="section_title">
            <div className="flex flex-row">
              <label className="title pr-3" htmlFor="rate">
                Rate :
              </label>
              <Select
                required
                name="rate"
                id="rate"
                class="w-full"
                options={options}
                onChange={handleOption}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label className="title pr-3" htmlFor="message">
                Message :
              </label>
              <div className="flex flex-row">
                <textarea
                  onChange={handleChange}
                  name="message"
                  id="message"
                  placeholder="Message"
                  className="w-full rounded-md py-4 px-6 border border-solid border-body-color"
                ></textarea>
                <a onClick={addFeedback} className="form-btn">
                  <div className="text-xl flex items-center justify-center">
                    <FaPlus />{" "}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </article>
      )}

      <div>
        {/* {error && <p>Error fetching feedbacks: {error.message}</p>} */}
        {feedbacks.map((feedback) => (
          <article key={feedback.id} className="bg-gray shadow m-3 p-3">
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 me-4 rounded-full"
                src={feedback.client.photo}
                alt={feedback.client.username}
              />
              <div className="font-bold hover:text-theme-color">
                <p>
                  {feedback.client.firstName} {feedback.client.lastName}
                  {/* Assuming client name is available */}
                  <time className="block text-sm text-gray-500 dark:text-gray-400">
                    Added on{" "}
                    {renderDate(feedback.created_at)}
                    {/* {new Date(feedback.created_at).toLocaleDateString("en-US", {
                      dateStyle: "full",
                      timeStyle: "long",
                    })} */}
                  </time>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              {renderStars(feedback.rate)}
              <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                {feedback.subject} {/* Assuming you have a subject field */}
              </h3>
            </div>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {feedback.message}
            </p>
          </article>
        ))}
      </div>
    </>
  );
};

export default Feedback;
