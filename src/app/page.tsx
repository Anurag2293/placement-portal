import Link from "next/link"
import MainNav from "@/components/MainNav"

export default function Home() {
	return (
		<>
			<MainNav />
			<div className="w-full md:w-5/6 mx-auto">
				<h1 className="mt-16 mb-4 text-3xl lg:text-6xl lg:w-4/6 lg:mb-8 lg:mt-14 mx-auto font-semibold tracking-wide leading-10 w-full text-center">
					{"Skills speak louder than words"}
				</h1>
				<p className="mt-8 mb-10 w-11/12 text-lg lg:text-xl text-center text-gray-800 lg:w-7/12 lg:mt-12 lg:mb-8 mx-auto">
					{"We help companies develop the strongest tech teams around. We help candidates sharpen their tech skills and pursue job opportunities."}
				</p>
				<div className="my-6 flex justify-center space-x-4">
					<Link href={"/access-account"}>
						<button className="bg-brand-secondary text-white text-base font-medium px-12 py-3 rounded">
							{"Sign up"}
						</button>
					</Link>
					<Link href={"/demo"}>
						<button className="text-black border border-black text-base px-12 py-3 rounded">
							{"Watch demo"}
						</button>
					</Link>
				</div>
				<p className="my-12 text-md md:text-lg lg:text-xl text-gray-800 text-center lg:w-7/12 lg:mt-12 lg:mb-8 mx-auto">
					{"Over 40% of developers worldwide and 3,000 companies use HackerCode."}
				</p>
			</div>
		</>
	)
}