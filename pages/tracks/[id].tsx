import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SERVER_URL } from '../../API';
import Comment from '../../components/Comment';
import CommentForm from '../../components/Forms/CommentForm';
import Header from '../../components/Header';
import MainLayout from '../../components/MainLayout';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AppStore, wrapper } from '../../redux/store';
import { fetchOneTrack } from '../../redux/thunks/trackPage';


const TrackPage = () => {
    const { track } = useAppSelector(state => state.trackPage)
    const { user } = useAppSelector(state => state.auth)

    return (
        <MainLayout title={track?.name}>
            <div className="flex flex-col w-full h-full bg-gradient-to-b from-yellow-700 to-black via-black p-5">
                <Header />
                <div className="flex flex-col w-full h-full text-white mt-5">

                    <div className="flex gap-5 items-center">
                        <div className="h-32 w-32 relative border border-white">
                            <Image src={SERVER_URL + "/" + track?.img} objectFit="cover" layout="fill" alt="cover" />
                        </div>
                        <div className="">
                            <h1 className="text-3xl font-bold">
                                {track?.name}
                            </h1>
                            <Link href={`/author/${track?.author._id}`}>
                                <span className="text-primaryGreen text-xl">
                                    {track?.author.name}
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h2 className="font-bold text-xl">Track text:</h2>
                        <p className="text-[16px]">{track?.text}</p>
                    </div>

                    {user && <CommentForm />}

                    <ul className="flex flex-col gap-7 mt-10">
                        {track && track?.comments.length > 0 && track?.comments.map(c => <Comment
                            key={c._id} item={c} />)}
                    </ul>

                </div>
            </div>
        </MainLayout>
    );
};

export default TrackPage;




export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store: AppStore) => async (context) => {
        try {
            const dispatch = store.dispatch;
            await dispatch(fetchOneTrack(context.query.id as string))

            return { props: {} }

        } catch (err) {
            console.log(err);
            return { props: {} }
        }
    }
)