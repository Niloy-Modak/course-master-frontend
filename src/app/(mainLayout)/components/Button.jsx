"use client"
import React from 'react';

const Button = ({ label, type, onClick,disabled,className }) => {
    return (
        <button 
        onClick={onClick}
        type={type} 
        disabled={disabled}
        className={`${className}cursor-pointer inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-emerald-600 border border-transparent rounded-full md:w-auto hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600`}>
            {label}
        </button>
    );
};

export default Button;