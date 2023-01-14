import React from 'react';
import RegisterForm from '../../components/Forms/RegisterForm';
import AuthLogo from '../../components/AuthLogo';


const Registration = () => {


    return (
        <div className="text-white w-full flex flex-col h-full">
            <AuthLogo title="Create Account" />

            <div className="w-full">
                <div className="bg-white w-[400px] mx-auto mt-20 rounded-lg p-5 text-black">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default Registration;