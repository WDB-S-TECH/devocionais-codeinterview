import { fetchDevocional } from "./_components/devocionalQuery"
import DevocionalComponent from "./_components/DevocionalComponent"
import { Metadata } from "next"
import { cookies } from "next/headers"

export const revalidate = 0

export const metadata: Metadata = {
	title: "Devocionais Semanais - AGJ Devocionais",
	description: "Nossos Devocionais semanais em lista aqui",
}
export default async function Home() {
	const cookiess = cookies()
	const devocionais = await fetchDevocional()

	console.log(devocionais.map((d) => d.title))

	return (
		<main>
			{devocionais?.map((d, i, a) => (
				<div key={`${d.title}-${i}`}>
					<DevocionalComponent devocional={d} />
					{a.length !== 1 && i !== a.length - 1 && (
						<div className="divider py-10" />
					)}
				</div>
			))}
		</main>
	)
}
