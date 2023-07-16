import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form";

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logIn } from '@/redux/features/hire-auth-slice';

import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";

type Props = {}

type FormValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

const SignIn = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch('/api/company/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const { success, message, company } = await response.json();

            if (!success) {
                throw new Error(message);
            }

            dispatch(logIn(company));
            router.push('/hire');
            
            setValue('email', '');
            setValue('password', '');
        } catch (error: any) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <Card className='' color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter your credentials to login.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    <Input {...register("email", { required: true })} size="lg" label="Email" />
                    <Input {...register("password", { required: true })} type="password" size="lg" label="Password" />
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                    Login
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Don't have an account?{" "}
                    <Link
                        href="/hire/sign-up"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Card>
    );
}

export default SignIn