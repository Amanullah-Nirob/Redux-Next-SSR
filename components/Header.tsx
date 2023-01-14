import { MenuAlt2Icon, ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { logout } from '../redux/slices/authSlice';
import Drawer from './Drawer';

const Header = () => {
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const [dropdown, setDropdown] = useState<boolean>(false)

    const onOpen = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const goToLogin = () => {
        router.push("/login")
    }


    const handleLogout = () => {
        destroyCookie(null, "musicToken")
        dispatch(logout())
    }

    return (
        <>
            <header className="flex justify-between sm:justify-end items-center">
                <button className="" onClick={onOpen}>
                    <MenuAlt2Icon className="w-10 h-10 text-white sm:hidden" />
                </button>

                {user
                    ? <div className="relative inline-flex items-center gap-3 bg-black bg-opacity-60 py-1 px-3 rounded-xl justify-end text-white">
                        <div className="h-10 w-10 relative rounded-[50%]">
                            <Image src="https://dpclinic.ru/upload/iblock/6ce/6ce2d48158f804ec94c075513884abcf.jpg" alt="user" className="rounded-[50%]" layout="fill" />
                        </div>
                        <span className="font-bold">{user.email}</span>
                        <button onClick={toggleDropdown} >
                            <ChevronDownIcon className={`h-6 w-6 ${dropdown && "rotate-180"} transition-all`} />
                        </button>

                        {dropdown && <div className="rounded-xl absolute bg-black origin-top-right top-14 right-0 w-full">
                            <ul className="flex flex-col">
                                <li className="hover:text-white transition-colors text-gray-300 p-3 flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                                    <LogoutIcon className="w-5 h-5" /> Logout
                                </li>
                            </ul>
                        </div>}
                    </div>

                    : <button onClick={goToLogin}
                        className="text-white bg-primaryGreen px-10 h-[30px] text-lg rounded-full hover:bg-green-600 transition-colors">
                        Login
                    </button>}
            </header>

            <Drawer onClose={onClose} isOpen={open} />
        </>
    );
};

export default Header;