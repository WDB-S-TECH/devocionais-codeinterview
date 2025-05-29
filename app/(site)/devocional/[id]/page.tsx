import { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchDevocionalById } from "./_components/devocionalByIdQuery"
import { DevocionalDetailComponent } from "./_components/DevocionalDetailComponent"

export const revalidate = 0

type Props = {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const devocional = await fetchDevocionalById(params.id)

	if (!devocional) {
		return {
			title: "Devocional não encontrado - AGJ Devocionais",
		}
	}

	return {
		title: `${devocional.title} - AGJ Devocionais`,
		description: devocional.verse,
	}
}

export default async function DevocionalPage({ params }: Props) {
	const devocional = await fetchDevocionalById(params.id)

	if (!devocional) {
		notFound()
	}

	return (
		<main className="container mx-auto px-4 py-6">
			<DevocionalDetailComponent devocional={devocional} />
		</main>
	)
} 