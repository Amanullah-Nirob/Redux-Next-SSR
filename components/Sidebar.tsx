import Link from 'next/link';
import React from 'react';
import NavItems from './NavItems';

const Sidebar = () => {

    return (
        <>
            <div className="sm:block w-[200px] h-full overflow-y-scroll scrollbar-hide hidden">
                <NavItems />
            </div>
        </>
    );
};

export default Sidebar;