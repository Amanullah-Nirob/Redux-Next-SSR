import React, { FC } from 'react';
import Image from 'next/image';
import logo from "../assets/logo.png"
import { useRouter } from 'next/router';


interface IAuthLogoProps {
    title: string
}

const AuthLogo: FC<IAuthLogoProps> = ({ title }) => {

    const router = useRouter()

    const handleClick = () => {
        router.push("/tracks")
    }

    return (
        <div className="flex items-center justify-center gap-3 border-b border-gray-300 py-5 cursor-pointer"
            onClick={handleClick}>
            <div className="relative w-16 h-16">
                <Image src={logo} alt="logo" layout="fill" objectFit="cover" />
            </div>
            <h1 className="font-bold text-4xl">
                {title}
            </h1>
        </div>
    );
};

export default AuthLogo;