import { PortableText } from "@portabletext/react"
import { Musica } from "./musicasQuery"

export const MusicaBlockComponent = ({ musica }: { musica: Musica }) => {
	return (
		<div className="mb-4 flex flex-col px-4 py-2 sm:px-6 md:px-4">
			<h2 className="pb-2 text-4xl">{musica.title}</h2>
			<span className="text-md text-gray-500">
				Autor: {musica.artist || "Desconhecido"}
			</span>
			<div className="prose-lg py-6">
				<PortableText value={musica.lyrics} />
			</div>
		</div>
	)
}
