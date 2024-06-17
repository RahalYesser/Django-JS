import React, { useEffect, useState } from "react";
import axios from "axios";
import { Popover } from "flowbite-react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const DemandesByClient = ({ user }) => {
  const [demandes, setDemandes] = useState([]);
  const fetchDemandes = async () => {
    try {
      const token = localStorage.getItem("token");
      //console.log(user.id);
      const response = axios.get(
        `http://127.0.0.1:8000/demandes-by-client/${user.id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setDemandes((await response).data);
      console.log((await response).data);
    } catch (err) {
      console.log(err.response.data);
      //setError(err.response.data);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Demande
              </th>
              <th scope="col" class="px-6 py-3">
                Service
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id} class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {demande.id}
                </th>
                <td className="px-6 py-4">
                  <Popover
                    trigger="hover"
                    content={
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                    
                        <div className="px-3 py-2">
                          <p>
                            Show service info 
                          </p>
                        </div>
                      </div>
                    }
                    placement="right"
                  >
                    <span>
                    <Link
                      to={`/${user.username}/services/${demande.service.id}`}
                      class="bg-pink-100 hover:bg-pink-200 text-pink-800 text-md font-bold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400 inline-flex items-center justify-center"
                    >
                      <span className="pr-3">{demande.service.title}</span>{" "}
                      <FaEye />
                    </Link>{" "}
                    </span>
                  </Popover>
                </td>
                <td class="px-6 py-4 text-right">
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DemandesByClient;
