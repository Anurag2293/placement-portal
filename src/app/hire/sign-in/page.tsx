'use client'

import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {Button, Card, Input, Typography} from "@material-tailwind/react";


type Props = {}

type FormValues = {
    email: string;
    password: string;
};

const HireSignIn = (props: Props) => {
    const { register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors } } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await signIn('credentials', {
                redirect: true,
                callbackUrl: "/hire",
                email: data.email,
                password: data.password,
            });
            setValue('email', '');
            setValue('password', '');
        } catch (error: any) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <Card className='' color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    {"Sign In"}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    {"Enter your credentials to login to Placement Portal Hire"}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input {...register("email", { required: true })} size="lg" label="Email" />
                        <Input {...register("password", { required: true })} type="password" size="lg" label="Password" />
                    </div>
                    <Button type="submit" className="mt-6" fullWidth>
                        {"Sign In"}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        {"Don't have an account?"}
                        <Link
                            href="/hire/sign-up"
                            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                        >
                            {"Sign Up"}
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    )
}

export default HireSignIn