import React, { FC, useState } from 'react';
import Image from "next/image"
import { CheckIcon, MusicNoteIcon, UploadIcon } from '@heroicons/react/outline';
import { IAuthor } from '../../types/DBmodels';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validate } from '../../utils/validate';
import FormControl from '../FormControl';
import { useDispatch } from 'react-redux';
import { uploadTrack } from '../../redux/thunks/tracks';
import { useAppSelector } from '../../hooks/useAppSelector';

interface IUploadFormProps {
    authors: IAuthor[]
}


interface IFormFields {
    author: string
    text: string
    name: string
}

const UploadForm: FC<IUploadFormProps> = ({ authors }) => {
    const dispatch = useDispatch()
    const { uploadError, isUploading } = useAppSelector(state => state.tracks)

    const [imgFile, setImgFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [audio, setAudio] = useState<null | File>(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormFields>()

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (e.target.files && e.target.files[0]) {
            setImgFile(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (ev) => {
            setPreview(ev.target?.result as string)
        }
    }

    const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAudio(e.target.files[0])
        }
    }


    const onSubmit: SubmitHandler<IFormFields> = ({ author, name, text }) => {
        const fd = new FormData()
        if (!imgFile || !audio) return;
        fd.append("name", name)
        fd.append("author", author)
        fd.append("text", text)
        fd.append("audio", audio)
        fd.append("img", imgFile)
        dispatch(uploadTrack(fd) as any)

        setImgFile(null)
        setPreview(null)
        setAudio(null)
        reset()
    }

    return (
        <div className="">
            {preview && <div className="w-28 h-28 relative border border-gray-300 mb-5" >
                <Image src={preview} objectFit="cover" layout="fill" alt="preview" />
            </div>}

            <form action="" className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-4 items-center mb-5">
                    <label htmlFor="img" className="blackBtn w-[180px]">
                        <UploadIcon className="w-5 h-5" />
                        Upload Image
                        <input type="file" id="img" className="hidden"
                            accept="image/png, image/gif, image/jpeg" onChange={handleImg} />
                    </label>
                    {imgFile && <CheckIcon className="w-8 h-8 text-green-500" />}
                </div>

                <div className="flex gap-4 items-center mb-5">
                    <label htmlFor="audio" className="blackBtn w-[180px]">
                        <MusicNoteIcon className="w-5 h-5" />
                        Upload Audio
                        <input type="file" id="audio" className="hidden"
                            accept="audio/mp3,audio/*;capture=microphone" onChange={handleAudio} />
                    </label>
                    {audio && <CheckIcon className="w-8 h-8 text-green-500" />}
                </div>

                <FormControl register={register("name", validate(1, 50))} error={errors.name}
                    id="name" label="Track name" type="text" />
                <FormControl register={register("text", validate(1, 500))} error={errors.text}
                    id="text" label="Track text" type="text" />

                <select id="author"{...register("author", validate(1, 50))}
                    className="rounded-md w-[180px] p-1 text-black" defaultValue="def">
                    <option value="def" disabled>Choose author</option>
                    {authors.map(a => <option key={a._id} value={a._id}>
                        {a.name}
                    </option>)}
                </select>

                <button type="submit" disabled={isUploading}
                    className="bg-primaryGreen flex items-center justify-center self-start font-bold h-8 px-10 mt-5 rounded-lg hover:bg-green-600 transition-colors text-black">
                    Upload track
                </button>

                {uploadError && <div className="text-red-500">{uploadError}</div>}
            </form>
        </div>
    );
};

export default UploadForm;
