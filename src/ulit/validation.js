export const validateEmployeeForm = (formData) => {
    const newErrors = {};

    if (!formData.firstName) {
        newErrors.firstName = 'First name cannot be empty';
    }
    if (!formData.lastName) {
        newErrors.lastName = 'Last name cannot be empty';
    }
    if (!formData.email) {
        newErrors.email = 'Email cannot be empty';
    }
    if (!formData.photograph) {
        newErrors.photograph = 'Image is required';
    }
    if (!formData.department) {
        newErrors.department = 'Department cannot be empty';
    }

    return newErrors;
};

export const validateUserForm = (formData) => {
    const newErrors = {};

    if (!formData.username) {
        newErrors.username = 'Username cannot be empty';
    }
    if (!formData.password) {
        newErrors.password = 'Password cannot be empty';
    }

    return newErrors;
};