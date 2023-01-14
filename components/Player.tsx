import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import { MusicNoteIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { setCurrentTime, setDuration, setPause, setPlay, setVolume } from '../redux/slices/playerSlice';
import { SERVER_URL } from '../API';
import { getDuration } from '../utils/time';


interface IPlayerProps {
    audio?: HTMLAudioElement
    onTogglePause: () => void
    handleCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Player: FC<IPlayerProps> = ({ audio, onTogglePause, }) => {
    const dispatch = useDispatch()
    const { pause, active, currentTime, duration, volume } = useAppSelector(state => state.player)



    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setVolume(+e.target.value))
        if (audio) {
            audio.volume = +e.target.value / 100
        }
    }


    if (!active) {
        return <></>
    }

    return (
        <div className="text-white h-24 bg-gradient-to-b from-black to-gray-900 px-2 xs:px-10 xs:justify-center xs:grid xs:grid-cols-3 items-center absolute bottom-0 left-0 w-full right-0 flex justify-between">
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 relative">
                    <Image src={SERVER_URL + "/" + active.img} alt="pic"
                        layout="fill" objectFit="cover" />
                </div>

                <div className="hidden xs:block">
                    <h3 className="font-bold">{active.name}</h3>
                    <span className="">{active.author.name}</span>
                </div>
            </div>


            <button className="justify-self-center hover:scale-105 transition-all flex items-center"
                onClick={onTogglePause}>
                {pause
                    ? <PlayIcon className="h-16 w-16" />
                    : <PauseIcon className="h-16 w-16" />}
            </button>


            <div className="flex items-center gap-3 justify-end">
                <VolumeOffIcon className="h-7 w-7" />
                <input type="range" max={100} min={0} value={volume}
                    onChange={handleVolume} step={2} />
                <span className="w-10">{volume}</span>
            </div>
        </div>
    );
};

export default Player;