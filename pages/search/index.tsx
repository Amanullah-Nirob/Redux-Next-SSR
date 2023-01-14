import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import MainLayout from '../../components/MainLayout';
import Track from '../../components/Track';
import { useAppSelector } from '../../hooks/useAppSelector';
import { searchTracks } from '../../redux/thunks/tracks';
import { validate } from '../../utils/validate';

interface IFormFields {
    query: string
}

const Search = () => {
    const dispatch = useDispatch()
    const { searchedTracks, isSearching } = useAppSelector(state => state.tracks)

    const { register, handleSubmit, formState: { errors } } = useForm<IFormFields>()

    const onSubmit: SubmitHandler<IFormFields> = ({ query }) => {
        dispatch(searchTracks(query) as any)
    }

    return (
        <MainLayout title="Search Tracks">

            <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-purple-900 via-gray-900 to-black">
                <Header />

                <div className="py-5">
                    <h1 className="font-bold text-white text-3xl mb-3">Search tracks</h1>
                    <form action="" className="flex gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="bg-transparent w-full border border-gray-400 focus:border-white p-2 rounded-lg text-white" placeholder="Search..."
                            {...register("query", validate(1, 50))} />

                        <button className="text-white flex bg-primaryGreen font-bold rounded-lg items-center justify-center px-5 gap-2 transition-colors hover:bg-green-600">
                            <SearchIcon className="w-6 h-6" />
                            Search
                        </button>
                    </form>
                </div>


                {isSearching
                    ? <div className="text-center"><Loader /></div>
                    : <section className="">
                        <ul className="">
                            {searchedTracks.length
                                ? searchedTracks.map(t => <Track item={t} key={t._id} />)
                                : <h3 className="font-bold text-white text-xl text-center">
                                    Tracks not found
                                </h3>}
                        </ul>
                    </section>}

            </div>

        </MainLayout>
    );
};

export default Search;