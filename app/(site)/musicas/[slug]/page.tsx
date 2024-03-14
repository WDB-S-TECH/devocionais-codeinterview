import { runQuery } from "@/sanity/lib/client"
import { MusicaBlockComponent } from "../_components/MusicaBlockComponent"
import { musicaBySlugQuery } from "../_components/musicasQuery"
import { redirect } from "next/navigation"

import type { Metadata, ResolvingMetadata } from "next"

type Props = {
	params: { slug: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// fetch data
	const musicas = await runQuery(musicaBySlugQuery, { slug: params.slug })

	const musica = musicas[0]

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || []

	return {
		title: `Música: ${musica.title} - AGJ Devocionais`,
		description: `Letra da música ${musica.title} - AGJ Devocionais`,
	}
}

export default async function Musicas({
	params,
}: {
	params: { slug: string }
}) {
	const musica = await runQuery(musicaBySlugQuery, { slug: params.slug })

	if (!musica.length) {
		return redirect("/404")
	}
	return (
		<MusicaBlockComponent
			key={musica[0].slug}
			musica={musica[0]}
		/>
	)
}
