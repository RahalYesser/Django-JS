import React, { useState } from 'react';
import axios from 'axios';
import contact from '../assets/images/contact.svg';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/send-email/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error('There was an error!', error.response.data);
            setStatus('error');
        }
    };

    return (
        <>
            <section id="contact" className="contact_area relative pt-18 pb-120">
                <div className="contact_image flex items-center justify-end">
                    <div className="image lg:pr-13">
                        <img src={contact} alt="about" />
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-end">
                        <div className="w-full lg:w-1/2">
                            <div className="contact_wrapper mt-11">
                                <div className="section_title pb-4">
                                    <h5 className="sub_title">Contact</h5>
                                    <h4 className="main_title">Get In Touch</h4>
                                    <p>Don't hesitate to reach out and connect with our platform today</p>
                                </div>
                                <div className="contact_form">
                                    <form id="contact-form" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="w-full md:w-1/2">
                                                <div className="mx-3">
                                                    <div className="single_form mt-8">
                                                        <input
                                                            name="name"
                                                            id="name"
                                                            type="text"
                                                            placeholder="Name"
                                                            className="w-full rounded-md py-4 px-6 border border-solid border-body-color"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                <div className="mx-3">
                                                    <div className="single_form mt-8">
                                                        <input
                                                            name="email"
                                                            id="email"
                                                            type="email"
                                                            placeholder="Email"
                                                            className="w-full rounded-md py-4 px-6 border border-solid border-body-color"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="mx-3">
                                                    <div className="single_form mt-8">
                                                        <textarea
                                                            name="message"
                                                            id="message"
                                                            placeholder="Message"
                                                            rows="5"
                                                            className="w-full rounded-md py-4 px-6 border border-solid border-body-color resize-none"
                                                            value={formData.message}
                                                            onChange={handleChange}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="mx-3">
                                                    <div className="single_form mt-8">
                                                        <button type="submit" className="form-btn">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {status === 'success' && <p className="success-message">Message sent successfully!</p>}
                                    {status === 'error' && <p className="error-message">There was an error sending the message.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
