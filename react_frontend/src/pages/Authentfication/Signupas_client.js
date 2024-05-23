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
            navigate('/profil');
            console.log("here");

        } catch (error) {
            console.error('There was an error!', error.response.data);
            // Handle error (e.g., show error messages)
        }
    };
  return (
    <>
        <Topbar/>
        <section class="">   
        <div class="container pt-120 pb-6">
            <form class="row justify-center " id="contact-form" >
                <div class="w-full lg:w-6/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
                    <div class="w-full pt-4">
                        <div class="section_title text-center pb-3">
                            <h5 class="sub_title">Sign up as client</h5>
                        </div> 
                    </div>
                    <div class="row">
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input value={formData.first_name} onChange={handleChange} required name="first_name" id="first_name" type="text" placeholder="First Name" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>                    
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input value={formData.last_name} onChange={handleChange} required name="last_name" id="last_name" type="text" placeholder="Last Name" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input value={formData.tel} onChange={handleChange} required name="tel" id="telephone" type="tel" placeholder="Telephone" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="row">
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <select value={formData.adresse} onChange={handleChange} required name="adresse" id="address_region" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color">
                                    <option value="" >Region</option>
                                    <option value="Bizerte">Bizerte</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Ariana">Ariana</option>
                                    
                                </select>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <select name="address_city" id="address_city" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color">
                                    <option value="" disabled selected>City</option>
                                    <option value="city1">EL ALIA</option>
                                    <option value="city2">City 2</option>
                                    <option value="city3">City 3</option>
                                </select>
                            </div> 
                        </div>
                    </div>

                    </div>
                    <div class="row">
                    <div class="w-full md:w-8/12">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="address_street" id="address_street" type="text" placeholder="Street" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full lg:w-4/12">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="postal_code" id="postal_code" type="text" placeholder="Postal Code" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input value={formData.email} onChange={handleChange} required name="email" id="email" type="email" placeholder="Email" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input value={formData.password} onChange={handleChange} required name="password" id="password" type="password" placeholder="Password" class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"/>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input required type="checkbox" id="terms" name="terms" value="agreed"/>
                                <label for="terms"> Yes, I understand and agree to the WorkWave Terms of Service, including the User Agreement and Privacy Policy.</label>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full row justify-center">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <button onClick={handleSubmit} class="form-btn">Sign up</button>
                            </div> 
                        </div>
                    </div>
                    <div class="w-full row justify-center ">
                        <div class="mx-4">
                            <div class="single_form mt-5">
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