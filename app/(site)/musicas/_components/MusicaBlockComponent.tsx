import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { Musica } from "./musicasQuery"

interface MusicaBlockComponentProps {
	musica: Musica
	variant?: 'grid' | 'full'
}

export const MusicaBlockComponent = ({ musica, variant = 'grid' }: MusicaBlockComponentProps) => {
	if (variant === 'full') {
		return (
			<div className="mb-4 flex flex-col px-4 py-2 sm:px-6 md:px-4">
				<h2 className="pb-2 text-4xl font-bold">{musica.title}</h2>
				<span className="text-md text-base-content/60 mb-6">
					Autor: {musica.artist || "Desconhecido"}
				</span>
				<div className="prose prose-lg">
					<PortableText value={musica.lyrics} />
				</div>
			</div>
		)
	}

	const slugValue = (musica.slug as any).current || musica.slug

	return (
		<Link href={`/musicas/${slugValue}`} className="block h-full">
			<div className="mb-4 flex flex-col px-4 py-2 sm:px-6 md:px-4 h-full hover:bg-base-200 transition-colors rounded-lg cursor-pointer">
				<h2 className="pb-2 text-2xl font-bold line-clamp-2">{musica.title}</h2>
				<span className="text-sm text-base-content/60 mb-4">
					Autor: {musica.artist || "Desconhecido"}
				</span>
				<div className="prose prose-sm flex-1 overflow-hidden">
					<div className="line-clamp-6">
						<PortableText value={musica.lyrics} />
					</div>
				</div>
			</div>
		</Link>
	)
}
