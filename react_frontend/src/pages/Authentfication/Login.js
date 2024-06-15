import React,  { useState } from 'react'
import axios from 'axios'
import Topbar from '../../components/Topbar'
import { useNavigate,Link } from 'react-router-dom'


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
            localStorage.setItem('token', response.data.token); // Store the token in localStorage
            navigate(`/${formData.username}/profile`); // Redirect to the profil
        } catch (error) {
            console.error('There was an error!', error.response.data);
            setError(error.response.data.message);
        }
    }
  return (
    <>
        <Topbar/>
        <section className="">           
        <div className="container pt-120 pb-6">
            <form className="row justify-center " onSubmit={handleSubmit} id="contact-form">
                <div className="w-full lg:w-4/12 bg-gray rounded-xl border border-solid border-opacity-10 border-body-color">
                    <div className="w-full pt-4">
                        <div className="section_title text-center pb-3">
                            <h5 className="sub_title">Login to WorkWave</h5>
                        {/* <h4 className="main_title">Work Process</h4> */}
                        </div> 
                    </div>
                    <div className="w-full">
                        <div className="mx-4">
                            <div className="single_form section_title mt-5">
                                <label className="title" htmlFor="description">Username</label>
                                <input height="12" 
                                name="username" 
                                id="email" 
                                type="text" 
                                placeholder="Username" 
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                />
                            </div> 
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mx-4">
                            <div className="single_form section_title mt-5">
                                <label className="title" htmlFor="password">Password</label>
                                <input name="password" 
                                id="password" 
                                type="password" 
                                placeholder="Password" 
                                className="w-full input-1 rounded-md py-4 px-6 border border-solid border-body-color"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                />
                            </div> 
                        </div>
                    </div>

                    {error && <p className="form-message mx-5 mt-4" style={{ color: 'red' }}>{error} ! </p>}

                    <p className="form-message mx-5 mt-4">Forget password ?</p>
                
                    <div className="w-full row justify-center">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <button type="submit" className="form-btn">Login</button>
                            </div> 
                        </div>
                    </div>

                 {/*    <div className="w-full row justify-center ">
                        <div className="mx-4">
                            <div className="single_form mt-5">
                                <p>Don't have a WorkWave account ?</p>
                            </div> 
                        </div>
                    </div> */}

                    <div className="w-full row justify-center pb-3">
                        <div className="mx-4">
                            <div className="row justify-center pt-6">
                                <h6>Don't have a WorkWave account ? </h6> 
                                <Link to='/signupas' className="pl-2 section_title">
                                    <h6 className="title">Sign up</h6>
                                </Link>
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