import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import { ITrack } from '../types/DBmodels';
import { SERVER_URL } from '../API';
import { useDispatch } from 'react-redux';
import { setActive, setCurrentTime, setDuration, setPause, setPlay } from '../redux/slices/playerSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import Player from './Player';
import { getDuration } from '../utils/time';
import Router, { useRouter } from 'next/router';

interface ITrackProps {
    item: ITrack
}

let audio: HTMLAudioElement;

const Track: FC<ITrackProps> = ({ item }) => {
    const router = useRouter()
    const { active, pause, volume, duration } = useAppSelector(state => state.player)
    const dispatch = useDispatch()

    const play = () => {
        audio.play()
        dispatch(setPlay())
    }

    const onTogglePause = () => {
        if (pause) {
            play()
        } else {
            dispatch(setPause())
            audio.pause()
        }
    }


    const handlePlay = () => {
        if (item._id !== active?._id) dispatch(setActive(item))
        play()
    }

    const onAuthorClick = () => {
        router.push(`/author/${item.author._id}`)
    }


    const goToTrack = () => {
        router.push(`/tracks/${item._id}`)
    }

    const handleCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentTime(+e.target.value))
        audio.currentTime = +e.target.value
    }

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
            audio.volume = volume / 100
        }
        if (active) {
            audio.src = `${SERVER_URL}/` + active.audio;
            audio.onloadeddata = () => {
                dispatch(setDuration(audio.duration))
            }
            audio.onended = () => {
                dispatch(setPause())
                dispatch(setCurrentTime(0))
            }
            play()
        }
    }, [active])


    const leave = () => {
        dispatch(setActive(null))
        audio ? audio.pause() : null
    }

    Router.events.on("beforeHistoryChange", leave)

    return (
        <>
            <li className="flex hover:bg-gray-900 p-4 rounded-lg items-center transition-all cursor-auto gap-3 text-white">

                {active && !pause && active._id === item._id
                    ? <button className="hover:scale-105 transition-all" onClick={onTogglePause}>
                        <PauseIcon className="w-10 h-10" />
                    </button>
                    : <button className="hover:scale-105 transition-all" onClick={handlePlay}>
                        <PlayIcon className="w-10 h-10" />
                    </button>}


                <div className="flex gap-3 flex-grow">
                    <div className="w-12 h-12 relative cursor-pointer" onClick={goToTrack}>
                        <Image src={SERVER_URL + "/" + item.img} alt="pic"
                            layout="fill" objectFit="cover" />
                    </div>


                    <div className="flex flex-col justify-start">
                        <p className="font-bold w-52 truncate inline-block">{item.name}</p>
                        <button onClick={onAuthorClick}
                            className="text-gray-400 cursor-pointer inline-block self-start hover:underline">
                            {item.author.name}
                        </button>
                    </div>
                </div>


                {active && item._id === active?._id && <div className="text-gray-400">
                    {getDuration(duration)}
                </div>}
            </li>


            <Player onTogglePause={onTogglePause} audio={audio}
                handleCurrentTime={handleCurrentTime} />
        </>
    );
};

export default Track;