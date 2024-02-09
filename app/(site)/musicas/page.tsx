import { runQuery } from "@/sanity/lib/client"
import { MusicaBlockComponent } from "./_components/MusicaBlockComponent"
import { musicasQuery } from "./_components/musicasQuery"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Músicas - AGJ Devocionais",
	description: "Lista com as Músicas do AGJ Devocionais.",
}

export default async function MusicaSlug() {
	const musicas = await runQuery(musicasQuery)
	return (
		<div className="px-4 py-2 sm:px-6 md:px-4">
			{musicas.map((musica, i, a) => (
				<div key={musica.slug}>
					<MusicaBlockComponent musica={musica} />
					{a.length !== 1 && i !== a.length - 1 && <div className="divider" />}
				</div>
			))}
		</div>
	)
}
