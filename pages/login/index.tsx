import React from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import logo from "../../assets/logo.png"
import Image from 'next/image';
import AuthLogo from '../../components/AuthLogo';


const Login = () => {


    return (
        <div className="text-white w-full flex flex-col h-full">
            <AuthLogo title="Login" />

            <div className="w-full">
                <div className="bg-white w-[400px] mx-auto mt-20 rounded-lg p-5 text-black">
                    <LoginForm />
                </div>
            </div>
        </div >
    );
};

export default Login;