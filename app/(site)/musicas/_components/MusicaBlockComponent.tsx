import { PortableText } from "@portabletext/react"
import { Musica } from "./musicasQuery"

export const MusicaBlockComponent = ({ musica }: { musica: Musica }) => {
	return (
		<div className="mb-4 flex flex-col">
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
