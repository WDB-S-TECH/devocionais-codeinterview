import { fetchDevocional } from "./_components/devocionalQuery"
import DevocionalComponent from "./_components/DevocionalComponent"
import { Metadata } from "next"

export const revalidate = 120 // revalidate every 2 minutes

export const metadata: Metadata = {
	title: "Devocionais Semanais - AGJ Devocionais",
	description: "Nossos Devocionais semanais em lista aqui",
}
export default async function Home() {
	const devocionais = await fetchDevocional()

	return (
		<main className="mx-auto max-w-2xl px-4">
			{devocionais?.map((d, i, a) => (
				<div key={`${d.title}-${i}`}>
					<DevocionalComponent devocional={d} devocionalId={d._id} />
					{a.length !== 1 && i !== a.length - 1 && (
						<div className="divider py-10" />
					)}
				</div>
			))}
		</main>
	)
}
