import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="h-5/6 flex justify-center items-center">
            <SignIn />
        </div>
    );
}