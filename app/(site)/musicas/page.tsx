import { runQuery } from "@/sanity/lib/client"
import { MusicaBlockComponent } from "./_components/MusicaBlockComponent"
import { musicasQuery } from "./_components/musicasQuery"

export default async function MusicaSlug() {
	const musicas = await runQuery(musicasQuery)
	return (
		<>
			{musicas.map((musica) => (
				<div key={musica.slug}>
					<MusicaBlockComponent musica={musica} />
					<div className="divider" />
				</div>
			))}
		</>
	)
}
