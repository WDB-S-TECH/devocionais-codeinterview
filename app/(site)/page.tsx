import { fetchDevocional } from "./_components/devocionalQuery"
import DevocionalComponent from "./_components/DevocionalComponent"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Devocionais Diários - AGJ Devocionais",
	description: "Nossos Devocionais diários em lista aqui",
}
export default async function Home() {
	const devocionais = await fetchDevocional()

	return (
		<main>
			{devocionais.map((d, i, a) => (
				<div key={d.title}>
					<DevocionalComponent devocional={d} />
					{a.length !== 1 && i !== a.length - 1 && <div className="divider" />}
				</div>
			))}
		</main>
	)
}
