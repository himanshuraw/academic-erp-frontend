import React, { useState } from 'react'
import FormInput from './FormInput';
import Button from './Button';
import { NavLink, useNavigate } from 'react-router';
import { validateUserForm } from '../ulit/validation';
import { signup } from '../api/auth';

function Signup() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateUserForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const data = await signup(formData);
                console.log(data);
                navigate('/login');
            } catch (error) {
                console.error("Error during sign up", error.message);
            }
        }
    };

    return (
        <div className='relative w-[90vw] sm:w-[70vw] lg:w-[35vw]'>
            <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 blur`} />
            <div className="relative p-10 rounded-lg bg-[#070707]">
                <h2 className="text-2xl font-bold text-center mb-6">User Signup</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        errorMessage={errors.username}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        errorMessage={errors.password}
                    />
                    <Button
                        label="Submit"
                        type='submit'
                    />
                </form>
                <div className='flex gap-2 mt-4'>
                    <div>Already have an account?</div>
                    <NavLink
                        to="/login"
                        className={"bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"}
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Signup