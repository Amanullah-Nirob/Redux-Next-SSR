import { XIcon, } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef } from 'react';
import NavItems from './NavItems';



interface IDrawerProps {
    onClose: () => void
    isOpen: boolean
}

const Drawer: FC<IDrawerProps> = ({ onClose, isOpen }) => {
    const router = useRouter()

    return (
        <div className={`w-[200px] bg-black h-full z-[3] fixed top-0 left-0 bottom-0 transition-all
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

            <div className="flex w-full justify-end p-3">
                <button className="opacity-80 hover:opacity-100 transition-colors text-white"
                    onClick={onClose} >
                    <XIcon className="w-10 h-10" />
                </button>
            </div>

            <NavItems />
        </div>
    );
};

export default Drawer;