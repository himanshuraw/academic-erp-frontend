import React, { useState } from 'react';

function FormInput({ label, type, name, value, onChange, errorMessage, isFile }) {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
        onChange(e);
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-semibold mb-1">
                {label}
            </label>
            {isFile ? (
                <div className="relative">
                    <label
                        htmlFor={name}
                        className="w-full p-2 text-white bg-[#090909] rounded-md cursor-pointer text-center block border border-gray-300"
                    >
                        Choose File
                    </label>
                    <input
                        type="file"
                        id={name}
                        name={name}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {fileName && (
                        <p className="mt-2 text-sm text-purple-400">
                            Selected: {fileName}
                        </p>
                    )}
                </div>
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-[#090909] text-white"
                />
            )}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </div>
    );
}

export default FormInput;
