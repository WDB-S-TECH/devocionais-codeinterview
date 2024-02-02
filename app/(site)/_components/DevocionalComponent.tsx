import { PortableText } from "@portabletext/react"
import { Devocional } from "./devocionalQuery"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import Link from "next/link"

export default function DevocionalComponent({
	devocional,
}: {
	devocional: Devocional
}) {
	return (
		<div className="flex flex-col gap-4">
			<span className="text-base font-bold">
				{dayjs(devocional.date)
					.locale("pt-br")
					.format("dddd, D [de] MMMM [de] YYYY")
					.replace(/^\w/, (c) => c.toUpperCase())}
			</span>
			<span className="bold text-base font-bold">Programação:</span>
			<ul className="prose list-inside list-disc pl-4">
				{devocional.program.map((p) => {
					let text = `${p.step}`

					if (p.colaborador) {
						text += ` - ${p.colaborador.name}`
					}

					if (p.etd) {
						text += ` - ${p.etd}min`
					}

					return <li key={p.step}>{text}</li>
				})}
			</ul>

			<span className="bold text-base font-bold">
				Músicas: (Clique para ver a letra)
			</span>
			<ul className="prose list-inside list-disc pl-4">
				{devocional.musicas.map((m) => {
					return (
						<li key={m.slug.current}>
							<Link href={`/musicas/${m.slug.current}`}>{m.title}</Link>
						</li>
					)
				})}
			</ul>

			<span className="bold text-base font-bold">Reflexão:</span>

			<div className="prose-lg">
				<h2>{devocional.title}</h2>
				<p className="text-base/1 text-center italic">{devocional.verse}</p>
				<div className="text-justify">
					<PortableText value={devocional.content} />
				</div>
			</div>
		</div>
	)
}
