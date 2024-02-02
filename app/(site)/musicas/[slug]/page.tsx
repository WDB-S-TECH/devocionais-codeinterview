import { runQuery } from "@/sanity/lib/client"
import { MusicaBlockComponent } from "../_components/MusicaBlockComponent"
import { musicaBySlugQuery, musicasQuery } from "../_components/musicasQuery"
import { redirect } from "next/navigation"

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
