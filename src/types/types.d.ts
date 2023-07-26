import type { Application, Process } from '@prisma/client';

export type ApplicationWithProcess = Application & {
    process: Process
}


export type Developer = {
    id: number;
    name: string;
    email: string;
}