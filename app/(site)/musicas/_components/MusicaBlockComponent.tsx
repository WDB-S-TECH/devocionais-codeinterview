import { PortableText } from "@portabletext/react"
import { Musica } from "./musicasQuery"

export const MusicaBlockComponent = ({ musica }: { musica: Musica }) => {
	return (
		<div className="prose-lg mb-4">
			<h2>{musica.title}</h2>
			<span className="text-sm text-gray-500">
				Autor: {musica.artist || "Desconhecido"}
			</span>
			<PortableText value={musica.lyrics} />
		</div>
	)
}
