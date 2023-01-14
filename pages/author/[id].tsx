import Image from 'next/image';
import React, { FC, useState } from 'react';
import { SERVER_URL } from '../../API';
import { AuthorService } from '../../API/authorService';
import Header from '../../components/Header';
import MainLayout from '../../components/MainLayout';
import Track from '../../components/Track';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AppStore, wrapper } from '../../redux/store';
import { IAuthor } from '../../types/DBmodels';


interface IAuthorProps {
    serverAuthor: IAuthor
}

const Author: FC<IAuthorProps> = ({ serverAuthor }) => {
    const [author, setAuthor] = useState<IAuthor>(serverAuthor)


    return (
        <MainLayout title={author.name}>
            <div className="flex flex-col flex-grow">
                <section className="h-[300px] bg-gradient-to-b from-green-700 to-black p-5">
                    <Header />
                    <div className="mt-3 text-white flex items-center gap-5">
                        <div className="relative h-[100px] w-[100px] sm:h-[130px] sm:w-[130px]">
                            <Image src={author.img} layout="fill" objectFit="cover"
                                alt="author" priority />
                        </div>
                        <div className="">
                            <h2 className="font-bold text-3xl">{author?.name}</h2>
                        </div>
                    </div>
                </section>

                <section className="">
                    <ul className="flex flex-col px-5">
                        {author && author.tracks.map(t => <Track item={t} key={t._id} />)}
                    </ul>
                </section>
            </div>
        </MainLayout>
    );
};

export default Author;




export const getServerSideProps = async ({ params }: any) => {
    try {
        const id = params.id
        const data = await AuthorService.fetchOne(id)

        return { props: { serverAuthor: data } }

    } catch (err) {
        console.log(err);
        return { props: {} }
    }
}