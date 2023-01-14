import React, { FC, HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IFormControlProps {
    id: string
    label: string
    register: UseFormRegisterReturn
    error: FieldError | undefined
    type: HTMLInputTypeAttribute
}

const FormControl: FC<IFormControlProps> = ({ id, label, register, error, type }) => {
    return (
        <div className="mb-4 w-full">
            <label htmlFor={id} className="font-bold">
                {label}
            </label>

            <input type={type} id={id} placeholder={label} {...register}
                className={`border rounded-lg p-2 w-full text-black 
                ${error?.message ? "border-red-700" : "focus:border-black border-gray-300"}`} />

            {error && <div className="text-red-700">
                {error.message}
            </div>}
        </div>
    );
};

export default FormControl;