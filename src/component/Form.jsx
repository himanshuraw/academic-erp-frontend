import React, { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';
import { validateEmployeeForm } from '../ulit/validation';
import { registerFaculty } from '../api/facultyApi';
import { useNavigate } from 'react-router';

function Form() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        photograph: null,
        department: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            photograph: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateEmployeeForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('firstName', formData.firstName);
            formDataToSubmit.append('lastName', formData.lastName);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('photograph', formData.photograph);
            formDataToSubmit.append('department', formData.department);

            try {
                const response = await registerFaculty(formDataToSubmit);
                setApiSuccess(response);
                console.log(response);
                if (response == "Already Exist") {
                    setApiSuccess(response);
                    return;
                }
                navigate(`/course-selection/${formData.email}`)

            } catch (error) {
                setApiError("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className='relative w-[90vw] sm:w-[70vw] lg:w-[35vw]'>
            <div className={`absolute -inset-1 shadow-md rounded-lg bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 blur`} />
            <div className="relative p-10 shadow-md rounded-lg bg-[#070707]">
                <h2 className="text-2xl font-bold text-center mb-6">Employee Registration</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        errorMessage={errors.firstName}
                    />
                    <FormInput
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        errorMessage={errors.lastName}
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        errorMessage={errors.email}
                    />
                    <FormInput
                        label="Photograph"
                        type="file"
                        name="photograph"
                        onChange={handleFileChange}
                        errorMessage={errors.photograph}
                        isFile={true}
                    />
                    <FormInput
                        label="Department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        errorMessage={errors.department}
                    />
                    <Button label="Submit" type="submit" />
                </form>

                {apiError && <div className="text-red-500 mt-4">{apiError}</div>}
                {apiSuccess && <div className="text-green-500 mt-4">{apiSuccess}</div>}
            </div>
        </div>
    );
}

export default Form;
