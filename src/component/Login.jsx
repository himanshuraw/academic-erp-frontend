import React, { useState } from 'react'
import Button from './Button';
import FormInput from './FormInput';
import { NavLink, useNavigate } from 'react-router';
import { validateUserForm } from '../ulit/validation';
import { login } from '../api/auth';

function Login() {
    const backgroundColor = "bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700";

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
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
                const response = await login(formData);
                console.log(response);
                navigate("/");
            } catch (error) {
                if (error.response) {
                    setApiError(error.response.data.message || 'Invalid credentials')
                } else {
                    setApiError("An error occurred. Please try again");
                }
            }
        }
    };

    return (
        <div className='relative w-[90vw] sm:w-[70vw] lg:w-[35vw]'>
            <div className={`absolute -inset-1 rounded-lg ${backgroundColor} blur`} />
            <div className="relative p-10 rounded-lg bg-[#070707]">
                <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
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
                {apiError && <div className='text-red-500 mt-4'>{apiError}</div>}
                <div className='flex gap-2 mt-4'>
                    <div>Don't have an account?</div>
                    <NavLink
                        to="/signup"
                        className={"bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"}
                    >
                        Signup
                    </NavLink>
                </div>
            </div>
        </div>
    );
}


export default Login