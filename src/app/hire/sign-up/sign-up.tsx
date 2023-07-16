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
import { useRouter } from 'next/navigation'

type Props = {}

type FormValues = {
    name: string;
    hrName: string,
    email: string;
    password: string;
    terms: boolean;
};

const SignUp = (props: Props) => {
    const router = useRouter();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch('/api/company/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const { success, message, company} = await response.json();

            if (!success) {
                throw new Error(message);
            }

            setValue('name', '');
            setValue('email', '');
            setValue('password', '');
            setValue('terms', false);
            console.log({success, message, company});
            alert(message);
            router.push('/hire/sign-in');
        } catch (error: any) {
            console.log(error);
            alert(error.message);
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
                    <Input {...register("name", { required: true })} size="lg" label="Full Company Name" />
                    <Input {...register("hrName", { required: true })} size="lg" label="Full HR Name" />
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
                            Terms and Conditions
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
                        href="/hire/sign-in"
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