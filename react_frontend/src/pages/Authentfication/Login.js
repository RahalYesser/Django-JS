import React,  { useState } from 'react'
import axios from 'axios'
import Topbar from '../../components/Topbar'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: formData.username, 
                password: formData.password
            });
            console.log('Response:', response.data);
            localStorage.setItem('token', response.data.token); // Store the token in localStorage
            navigate('/profil'); // Redirect to the profil
        } catch (error) {
            console.error('There was an error!', error.response.data);
            setError(error.response.error);
        }
    }
  return (
    <>
        <Topbar/>
        <section class="">     
        <div class="container pt-120 pb-6">
            <form class="row justify-center " onSubmit={handleSubmit} id="contact-form">
                <div class="w-full lg:w-4/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
                    <div class="w-full pt-4">
                        <div class="section_title text-center pb-3">
                            <h5 class="sub_title">Login to WorkWave</h5>
                        {/* <h4 class="main_title">Work Process</h4> */}
                        </div> 
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input height="12" 
                                name="username" 
                                id="email" 
                                type="text" 
                                placeholder="Username" 
                                class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                />
                            </div> 
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <input name="password" 
                                id="password" 
                                type="password" 
                                placeholder="Password" 
                                class="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                />
                            </div> 
                        </div>
                    </div>

                    {error && <p className="form-message mx-5 mt-4" style={{ color: 'red' }}>{error}</p>}

                    <p class="form-message mx-5 mt-4">Forget password ?</p>
                
                    <div class="w-full row justify-center">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <button type="submit" class="form-btn">Login</button>
                            </div> 
                        </div>
                    </div>

                    <div class="w-full row justify-center ">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <p>Don't have a WorkWave account ?</p>
                            </div> 
                        </div>
                    </div>

                    <div class="w-full row justify-center pb-3">
                        <div class="mx-4">
                            <div class="single_form mt-5">
                                <button type="submit" class="form-btn">Sign up</button>
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

export default Login