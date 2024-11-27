import React from 'react';

function Button({ label, onClick, type = "button" }) {
    return (
        <div className="relative mt-4 w-full group">
            <div
                className={`absolute -inset-1 rounded-md 
                    bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 
                    blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
            <button
                type={type}
                onClick={onClick}
                className={`relative w-full p-2 text-white rounded-md 
                    bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700`}
            >
                {label}
            </button>
        </div>
    );
}

export default Button;
