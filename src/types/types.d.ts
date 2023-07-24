
export type Developer = {
    id: number;
    name: string;
    email: string;
}

export type Process = {
    id: number,
    company_id: number,
    createdAt: Date,
    role: string,
    description: string,
    compensation: number,
    eligibility: string,
    location_country: string,
    location_state: string,
    location_city: string,
    mode_of_work: string,
    status: string,
    expected_start_date: Date,
    apply_deadline: Date
}
