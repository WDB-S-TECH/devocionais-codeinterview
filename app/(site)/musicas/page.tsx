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
		<div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 md:px-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{musicas.map((musica) => (
					<div key={musica.slug}>
						<MusicaBlockComponent musica={musica} />
					</div>
				))}
			</div>
		</div>
	)
}
