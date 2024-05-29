import React, {useState} from 'react'
import Topbar from '../../components/Topbar'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';


const Signupas_client = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        tel: '',
        adresse: '',
        email: '',
        password: '',
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
        // Combine first name and last name to create username
        const username = `${formData.first_name}${formData.last_name}`.toLowerCase();

        // Create a new object to send to the backend
        const dataToSubmit = {
            user: {
                username,
                email: formData.email,
                password: formData.password,
            },
            firstName: formData.first_name,
            lastName: formData.last_name,
            tel: formData.tel, 
            adresse: formData.adresse        
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/clientsignup/', dataToSubmit);
            console.log('Response:', response.data);
            // Handle success (e.g., redirect to a new page, show a success message, etc.)
            // Assuming the token is returned in the response
            const token = response.data.token;
            // Store token in local storage
            localStorage.setItem('token', token);
            // Redirect to profile page
            navigate(`/${username}/profil`);
            console.log("here");

        } catch (error) {
            console.error('There was an error!', error.response.data);
            // Handle error (e.g., show error messages)
        }
    };
  return (
    <>
        <Topbar/>
        <section className="">   
        <div className="container pt-120 pb-6">
            <form className="row justify-center " id="contact-form" >
                <div className="w-full lg:w-6/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
                    <div className="w-full pt-4">
                        <div className="section_title text-center pb-3">
                            <h5 className="sub_title">Sign up as client</h5>
                        </div> 
                    </div>
                    <div className="row">
                    <div className="w-full md:w-1/2">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input value={formData.first_name} onChange={handleChange} required name="first_name" id="first_name" type="text" placeholder="First Name" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>                    
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input value={formData.last_name} onChange={handleChange} required name="last_name" id="last_name" type="text" placeholder="Last Name" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input value={formData.tel} onChange={handleChange} required name="tel" id="telephone" type="tel" placeholder="Telephone" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div className="row">
                    <div className="w-full md:w-1/2">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <select value={formData.adresse} onChange={handleChange} required name="adresse" id="address_region" className="w-full select-1 rounded-md px-6 border border-solid border-body-color">
                                    <option value="" >Region</option>
                                    <option value="Bizerte">Bizerte</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Ariana">Ariana</option>
                                    
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <select name="address_city" id="address_city" className="w-full select-1 rounded-md px-6 border border-solid border-body-color">
                                    <option value="" disabled selected>City</option>
                                    <option value="city1">EL ALIA</option>
                                    <option value="city2">City 2</option>
                                    <option value="city3">City 3</option>
                                </select>
                            </div> 
                        </div>
                    </div>

                    </div>
                    <div className="row">
                    <div className="w-full md:w-8/12">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input name="address_street" id="address_street" type="text" placeholder="Street" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div className="w-full lg:w-4/12">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input name="postal_code" id="postal_code" type="text" placeholder="Postal Code" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input value={formData.email} onChange={handleChange} required name="email" id="email" type="email" placeholder="Email" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input value={formData.password} onChange={handleChange} required name="password" id="password" type="password" placeholder="Password" className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <input required type="checkbox" id="terms" name="terms" value="agreed"/>
                                <label for="terms"> Yes, I understand and agree to the WorkWave Terms of Service, including the User Agreement and Privacy Policy.</label>
                            </div> 
                        </div>
                    </div>
                    <div className="w-full row justify-center">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <button onClick={handleSubmit} className="form-btn">Sign up</button>
                            </div> 
                        </div>
                    </div>
                    <div className="w-full row justify-center ">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <p>Already have a WorkWave account? <a href="#">Login here</a>.</p>
                            </div> 
                        </div>
                    </div>
                </div> 
            </form>
        </div> 
    </section>

    </>
  )
}

export default Signupas_client