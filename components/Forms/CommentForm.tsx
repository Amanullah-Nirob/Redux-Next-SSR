import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { createComment } from '../../redux/thunks/trackPage';
import { validate } from '../../utils/validate';

interface IFormFields {
    text: string
}


const CommentForm = ({ }) => {
    const dispatch = useDispatch()
    const { track } = useAppSelector(state => state.trackPage)

    const { reset, register, handleSubmit, formState: { errors } } = useForm<IFormFields>()

    const onSubmit: SubmitHandler<IFormFields> = ({ text }) => {
        dispatch(createComment({ text, trackId: track!._id }) as any)
        reset()
    }

    return (
        <div className="mt-10">
            <h4 className="font-bold text-xl">Comments:</h4>
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <textarea id="text" className="resize-none bg-transparent border border-gray-500 w-full py-1 px-2 mt-2 focus:border-gray-300" placeholder="New comment..."
                    {...register("text", validate(1, 250))} />

                {errors.text && <div className="text-red-700 mt-1">{errors.text.message}</div>}

                <button type="submit" className='bg-primaryGreen hover:bg-green-700 transition-colors px-5 h-8 mt-2 text-[16px]'>
                    Add comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;