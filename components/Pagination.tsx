import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { setPage } from '../redux/slices/tracksSlice';

const Pagination = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { totalCount, page } = useAppSelector(state => state.tracks)

    const totalPages = Math.ceil(totalCount / 5)
    const pages: number[] = []

    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }

    const onPageChange = (p: number) => {
        dispatch(setPage(p))
    }


    
    return (
        <div className="mt-5 mb-20">
            <ul className="flex gap-2">
                {pages.map(p => <button key={p} onClick={() => onPageChange(p)}
                    className={`w-10 h-10 rounded-[50%]  transition-colors flex justify-center items-center border border-primaryGreen ${page === p && "bg-primaryGreen"}`}>
                    {p}
                </button>)}
            </ul>
        </div>
    );
};

export default Pagination;