import React from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type ProcessFormValues = {
    role: string,
    description: string,
    compensation: number,
    eligibility: string,
    location_country: string,
    location_state: string,
    location_city: string,
    remote: boolean,
    status: string,
    mode_of_work: string,
    expected_start_date: Date,
    apply_deadline: Date
}


export default function ProcessForm({ company_id }: { company_id: string }) {
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProcessFormValues>();

    const onSubmit: SubmitHandler<ProcessFormValues> = async (data) => {
        try {
            const parsedCompensation = parseInt(data.compensation.toString());
            const newData = { 
                ...data, 
                company_id, 
                compensation: parsedCompensation,
            }
            const response = await fetch('/api/process/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData),
            });
            const { success, message, process } = await response.json();

            if (!success) {
                throw new Error(message);
            }

            alert(message);
            setValue('role', '');
            setValue('description', '');
            setValue('compensation', 0);
            setValue('eligibility', '');
            setValue('location_country', '');
            setValue('location_state', '');
            setValue('location_city', '');
            setValue('remote', false);
            setValue('status', 'open');
            setValue('expected_start_date', new Date());
            setValue('apply_deadline', new Date());

            router.replace(`/hire`)
        } catch (error: any) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className="col-span-full md:w-3/5 ">
                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                Role
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("role", { required: true })}
                                    type="text"
                                    name="role"
                                    id="role"
                                    autoComplete="role"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full md:w-3/5">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <p className="mt-2 text-sm leading-6 text-gray-600">Mention about your company and the Job Description</p>
                            <div className="mt-2">
                                <textarea
                                    {...register("description", { required: true })}
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="compensation" className="block text-sm font-medium leading-6 text-gray-900">
                                {"Estimated Compensation (in INR) per annum"}
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{"INR  "}</span>
                                    <input
                                        {...register("compensation", { required: true })}
                                        type="number"
                                        name="compensation"
                                        id="compensation"
                                        autoComplete="compensation"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full md:w-3/5">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                {"Eligibility"}
                            </label>
                            <p className="mt-2 text-sm leading-6 text-gray-600">{"Mention about who can apply for the role and minimum qualification"}</p>
                            <div className="mt-2">
                                <textarea
                                    {...register("eligibility", { required: true })}
                                    id="eligibility"
                                    name="eligibility"
                                    rows={4}
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="location_country" className="block text-sm font-medium leading-6 text-gray-900">
                                {"Country / Region"}
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("location_country", { required: true })}
                                    type="text"
                                    name="location_country"
                                    id="location_country"
                                    autoComplete="location_country"
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full space-y-4 md:space-y-0 md:space-x-4 md:w-3/5 md:flex">
                            <div className="w-full md:w-1/2">
                                <label htmlFor="location_state" className="block text-sm font-medium leading-6 text-gray-900">
                                    {"State / Province"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("location_state", { required: true })}
                                        type="text"
                                        name="location_state"
                                        id="location_state"
                                        autoComplete="location_state"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <label htmlFor="location_city" className="block text-sm font-medium leading-6 text-gray-900">
                                    {"City / Town"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("location_city", { required: true })}
                                        type="text"
                                        name="location_city"
                                        id="location_city"
                                        autoComplete="location_city"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Mode of Work
                        </label>
                        <div className="mt-2">
                            <select
                                {...register("mode_of_work", { required: true })}
                                id="mode_of_work"
                                name="mode_of_work"
                                autoComplete="mode_of_work"
                                className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option className="py-2" value={"inoffice"}>InOffice</option>
                                <option className="py-2" value={"remote"}>Remote</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Process
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
