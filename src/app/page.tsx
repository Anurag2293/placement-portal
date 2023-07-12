'use client'
import { useState, useEffect } from "react"
import type { Developer } from "@/lib/types"

export default function Home() {
	const [developers, setDevelopers] = useState<Developer[]>([])

	useEffect(() => { 
		const getDevelopers = async () => {
			const response = await fetch('/api')
			const data = await response.json()
			setDevelopers(data)
			console.log(data)
		}
		getDevelopers()
	}, [])

	return (
		<div>
			{developers.map((developer, index) => (
				<div key={index}>
					<h1>{developer.name}</h1>
					<p>{developer.email}</p>
				</div>
			))}
		</div>
	)
}
