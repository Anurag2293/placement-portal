'use client'

import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    Typography,
    CardBody,
    Chip,
    CardHeader,
    Input,
    Button,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import Link from "next/link";
import type { ApplicationWithProcess } from "@/types/types";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const DASHBOARD_TABLE_HEAD = ["Company", "Role", "Status", "Applied On", ""];

type Props = {
    applications: ApplicationWithProcess[];
}

export default function HireTable({ applications }: Props) {
    return (
        <Card className="h-full w-full bg-dark-secondary z-0">
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="border-white border rounded-sm">
                            {DASHBOARD_TABLE_HEAD.map((head, index) => (
                                <th
                                    key={head}
                                    className="cursor-pointer border-b border-blue-gray-100 bg-dark-secondary p-4 transition-colors hover:bg-dark-primary"
                                >
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}{" "}
                                        {index !== DASHBOARD_TABLE_HEAD.length - 1 && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application, index) => {
                            const isLast = index === applications.length - 1;
                            const classes = isLast ? "p-4 bg-dark-gray hover:bg-dark-primary" : "p-4 border-b border-blue-gray-50 bg-dark-gray hover:bg-dark-primary";

                            return (
                                <tr key={application.id} className="bg-black">
                                    <td className={classes}>
                                        <Typography variant="small" color="white" className="font-normal">
                                            {application.process.company_name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="white" className="font-normal hover:bg-black">
                                            {application.process.role}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="white" className="font-normal hover:bg-black capitalize">
                                            {application.status}
                                        </Typography>
                                        {/* <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                size="sm"
                                                value={online ? "online" : "offline"}
                                                color={online ? "green" : "blue-gray"}
                                            />
                                        </div> */}
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" color="white" className="font-normal">
                                            {new Date(application.createdAt).toLocaleDateString('en-GB').replaceAll('/', '-')}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Link href={`/developer/apply/${application.process.id}`}>
                                            <Typography variant="small" color="white" className="font-normal">
                                                {"View Details"}
                                            </Typography>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}

{/* <CardHeader floated={false} shadow={false} className="rounded-none bg-dark-secondary">
    <div className="mb-8 flex items-center justify-between gap-8">
        <div>
            <Typography variant="h5" color="blue-gray">
                Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                See information about all members
            </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" color="blue-gray" size="sm">
                view all
            </Button>
            <Button className="flex items-center gap-3" color="blue" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
        </div>
    </div>
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
                {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                ))}
            </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
        </div>
    </div>
</CardHeader> */}
{/* <CardBody className="overflow-scroll px-0"> */ }

{/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
        </Typography>
        <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" size="sm">
                Previous
            </Button>
            <Button variant="outlined" color="blue-gray" size="sm">
                Next
            </Button>
        </div>
    </CardFooter> */}