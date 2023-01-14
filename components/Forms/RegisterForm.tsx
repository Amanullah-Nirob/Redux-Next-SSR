import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { registerThunk } from '../../redux/thunks/auth';
import { validate } from '../../utils/validate';
import FormControl from '../FormControl';


interface IFormFields {
    email: string
    password: string
}



const RegisterForm = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { registerError, isSubmitting, user } = useAppSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors } } = useForm<IFormFields>()

    const onSubmit: SubmitHandler<IFormFields> = ({ email, password }) => {
        dispatch(registerThunk({ email, password }) as any)
    }

    useEffect(() => {
        if (user) {
            router.push('/tracks')
        }
    }, [user])

    return (
        <>
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <FormControl register={register("email", validate(5, 50))} id="email"
                    label="Your email" error={errors.email} type="email" />

                <FormControl register={register("password", validate(6, 50))} id="password"
                    label="Your password" error={errors.password} type="password" />

                <button className="bg-primaryGreen hover:bg-green-600 transition-colors px-10 font-bold h-[35px] rounded-lg text-lg"
                    disabled={isSubmitting}>
                    Create account
                </button>

                {registerError && <div className="text-red-700 mt-2">{registerError}</div>}
            </form>

            <p className="mt-3">Already have an account? <Link href="/login">
                <span className="text-primaryGreen hover:underline cursor-pointer">
                    Login
                </span>
            </Link>
            </p>
        </>
    );
};

export default RegisterForm;