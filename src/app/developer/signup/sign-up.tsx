'use client'

import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Link from 'next/link';

type Props = {}

type FormValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

const SignUp = (props: Props) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch('/api/auth/developer/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            setValue('name', '');
            setValue('email', '');
            setValue('password', '');
            setValue('terms', false);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card className='' color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input {...register("name", { required: true })} size="lg" label="Full Name" />
                    <Input {...register("email", { required: true })} size="lg" label="Email" />
                    <Input {...register("password", { required: true })} type="password" size="lg" label="Password" />
                </div>
                <Checkbox
                    {...register("terms", { required: true })}
                    label={(<Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                    >
                        I agree the
                        <a href="#" className="font-medium transition-colors hover:text-blue-500">
                            &nbsp;Terms and Conditions
                        </a>
                    </Typography>)}
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button type="submit" className="mt-6" fullWidth>
                    Register
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <Link
                        href="/developer/login"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}

export default SignUp