import { HomeIcon, UploadIcon, SearchIcon, MusicNoteIcon } from '@heroicons/react/outline';
import router from 'next/router';
import React from 'react';

const NavItems = () => {
    return (
        <nav className="flex flex-col py-5 gap-5">
            <button className="navItem" onClick={() => router.push("/tracks")}>
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
            </button>

            <button className="navItem" onClick={() => router.push("/tracks/upload")}>
                <UploadIcon className="w-5 h-5" />
                <span>Upload Track</span>
            </button>

            <button className="navItem" onClick={() => router.push("/search")}>
                <SearchIcon className="w-5 h-5" />
                <span>Search</span>
            </button>

            <button className="navItem">
                <MusicNoteIcon className="w-5 h-5" />
                <span>Your Playlist</span>
            </button>
        </nav>
    );
};

export default NavItems;