import React, { useEffect, useState } from "react";
import axios from 'axios';

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
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
    fetchServices();
  }, []);
  return (
    <>
    <div className="team-wrapper relative">
        <div className="row team_active">
        {services.map((service) => (
            <div key={service.id} className="w-full lg:w-4/12">           
                <div className="single_team_item mx-auto">
                <div className="single_team mx-3">
                    <div className="team_image relative">
                    <img src="assets/images/team-1.jpg" alt="team" className="w-full" />
                    <ul className="social absolute top-4 right-8">
                        <li>
                        <a href="#">
                            <i className="lni lni-eye"></i>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            <i className="lni lni-pencil"></i>
                        </a>
                        </li>
                        <li>
                        <a href="#">
                            {/* <i class="lni lni-eraser"></i> */}
                            <i className="lni lni-trash"></i>
                             
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div className="team_content py-5 px-8 relative">
                    <h4 className="team_name text-xl md:text-2xl">
                        <a href="#" className="text-black group-hover:text-white">
                        {service.title}
                        </a>
                    </h4>
                    <p className="mt-2 transition-all duration-300 group-hover:text-white">
                        {service.tarif}
                    </p>
                    </div>
                </div>{" "}
                {/* <!-- single team --> */}
                </div>
                
            </div>

          
            ))}
        </div>
    </div>
    </>
  );
};

export default AllServices;
