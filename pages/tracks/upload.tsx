import { GetStaticProps } from 'next';
import React, { FC, useState } from 'react';
import { AuthorService } from '../../API/authorService';
import UploadForm from '../../components/Forms/UploadForm';
import Header from '../../components/Header';
import MainLayout from '../../components/MainLayout';
import { IAuthor } from '../../types/DBmodels';


interface IUploadTrackProps {
    authors: IAuthor[]
}


const UploadTrack: FC<IUploadTrackProps> = ({ authors }) => {

    return (
        <MainLayout title="Upload Track">
            <div className="flex flex-col bg-gradient-to-b bg-orange-400 from-green-900 via-black to-black w-full h-full p-5">
                <Header />
                <div className="text-white p-5">
                    <UploadForm authors={authors} />
                </div>
            </div>
        </MainLayout>
    );
};

export default UploadTrack;



export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const data = await AuthorService.fetchAll()
        return { props: { authors: data } }

    } catch (err) {
        console.log(err)
        return { props: {} }
    }
}