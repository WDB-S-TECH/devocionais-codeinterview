import { runQuery } from "@/sanity/lib/client"
import { MusicaBlockComponent } from "./_components/MusicaBlockComponent"
import { musicasQuery } from "./_components/musicasQuery"

export default async function MusicaSlug() {
	const musicas = await runQuery(musicasQuery)
	return (
		<>
			{musicas.map((musica, i, a) => (
				<div key={musica.slug}>
					<MusicaBlockComponent musica={musica} />
					{a.length !== 1 && i !== a.length - 1 && <div className="divider" />}
				</div>
			))}
		</>
	)
}
