import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { shuffle } from "lodash"
// import { ChevronDownIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import Track from './Track';
import { useAppSelector } from '../hooks/useAppSelector';
import { SERVER_URL } from '../API';
import { useRouter } from 'next/router';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/tracksSlice';
import { fetchTracks } from '../redux/thunks/tracks';
import Pagination from './Pagination';
import Loader from './Loader';


const colors = [
    "from-green-900",
    "from-red-500", 
    "from-yellow-600",
    "from-purple-500",
    "from-pink-500",
    "from-blue-500",
    "from-orange-500"
]

const HomeContent = () => {
    const dispatch = useDispatch()

    const [bgcolor, setBgcolor] = useState<string | null>(null)
    const { tracks, page, isFetching } = useAppSelector(state => state.tracks)
    const { active } = useAppSelector(state => state.player)

    const router = useRouter()

    const onAuthorClick = () => {
        router.push(`/author/` + active?.author._id)
    }

    useEffect(() => {
        setBgcolor(shuffle(colors).pop()!)
    }, [])

    useEffect(() => {
        dispatch(fetchTracks(page) as any)
    }, [page])


    return (
        <>
            <div className="flex-grow text-white flex flex-col h-screen">

                <section className={`w-full bg-gradient-to-b to-black ${bgcolor} h-[400px] sm:p-5 p-2`}>
                    <Header />

                    {active && <div className="mt-5 flex items-center gap-5">
                        <div className="h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] border border-white relative bg-black">
                            <Image src={SERVER_URL + "/" + active.img} objectFit="cover"
                                layout="fill" alt="activeTrack" />
                        </div>

                        <div className="">
                            <h1 className="font-bold text-3xl">
                                {active.name}
                            </h1>
                            <h2 className="text-lg text-primaryGreen cursor-pointer hover:underline inline-block"
                                onClick={onAuthorClick}>
                                {active.author.name}
                            </h2>
                        </div>
                    </div>}
                </section>


                <section className="h-full p-5 flex flex-col overflow-hidden overflow-y-scroll scrollbar-hide">
                    <ul className="flex flex-col flex-grow ">

                        {isFetching
                            ? <Loader />
                            : tracks.map(t => <Track key={t._id} item={t} />)}

                    </ul>
                    <Pagination />
                </section>
            </div>
        </>
    );
};

export default HomeContent;

