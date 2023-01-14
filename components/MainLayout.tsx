import Head from 'next/head';
import React, { FC } from 'react';
import Sidebar from './Sidebar';

interface IMainLayoutProps {
    children: React.ReactNode
    title?: string
}

const MainLayout: FC<IMainLayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || "Music App"}</title>
                <meta name="description" content={`Music app. Everyone can listen and upload music!`} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords"
                    content={"music, tracks, artists, listen music, best music,"} />
            </Head>

            <main className="w-full flex-grow flex flex-col h-screen">
                <div className="flex flex-grow">
                    <Sidebar />
                    {children}
                </div>
            </main>
        </>
    );
};

export default MainLayout;