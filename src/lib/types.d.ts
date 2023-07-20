
export type Developer = {
    id: number;
    name: string;
    email: string;
}

export type ProcessFormValues = {
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
