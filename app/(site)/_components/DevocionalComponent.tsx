import { PortableText } from "@portabletext/react"
import { Devocional } from "./devocionalQuery"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import Link from "next/link"
import {
	ChevronRight,
	ListCollapse,
	Mic2,
	Music2Icon,
	MusicIcon,
	ExternalLink,
	Eye
} from "lucide-react"

export default function DevocionalComponent({
	devocional,
	devocionalId,
}: {
	devocional: Devocional
	devocionalId?: string
}) {
	return (
		<div className="flex flex-col gap-4">
			<div className="border-border bg-base-100 sticky top-16 w-full rounded-none border border-solid py-1 text-center text-base font-bold shadow-md md:top-[66px] md:rounded-md flex items-center justify-between px-4">
				<span className="flex-1">
					{dayjs(devocional.date)
						.locale("pt-br")
						.format("dddd, D [de] MMMM [de] YYYY")
						.replace(/^\w/, (c) => c.toUpperCase())}
				</span>
				{devocionalId && (
					<Link 
						href={`/devocional/${devocionalId}`}
						className="btn btn-ghost btn-sm"
						aria-label="Ver detalhes do devocional"
					>
						<Eye className="w-4 h-4" />
						Ver Detalhes
					</Link>
				)}
			</div>
			<div className="px-4 py-2 sm:px-6 md:px-4">
				<div className="flex items-center gap-2">
					<ListCollapse className="text-accent size-6" />
					<span className="bold text-base font-bold">Programação:</span>
				</div>
				<ul className="prose mb-6 list-inside pl-4">
					{!devocional.program?.length ? (
						<li>Sem programação</li>
					) : (
						devocional.program.map((p, i) => {
							let text = ""
							if (p.step) {
								text += `${p.step ?? ""}`
							}
							if (p.colaborador) {
								text += ` - ${p.colaborador.name ?? ""}`
							}
							if (p.etd) {
								text += ` (${p.etd}min)`
							}
							return (
								<li
									className="flex items-center gap-2"
									key={`${p.step}-${i}`}
								>
									<ChevronRight className="size-5" />
									{text}
								</li>
							)
						})
					)}
				</ul>
				<div className="flex items-center gap-2">
					<MusicIcon className="text-accent size-6" />
					<span className="bold text-base font-bold">
						Músicas: (Clique para ver a letra)
					</span>
				</div>
				<ul className="prose mb-6 list-inside pl-4">
					{devocional.musicas?.length ? (
						devocional.musicas
							.sort((a, b) => {
								if (a.title < b.title) {
									return -1
								}
								if (a.title > b.title) {
									return 1
								}
								return 0
							})
							.map((m) => {
								return (
									<li
										key={m.slug?.current}
										className="flex items-center gap-2"
									>
										<Music2Icon className="size-5" />
										<Link href={`/musicas/${m.slug?.current}`}>{m.title}</Link>
									</li>
								)
							})
					) : (
						<li>Sem músicas na programação</li>
					)}
				</ul>
				<div className="mb-2 flex items-center gap-2">
					<Mic2 className="text-accent size-6" />
					<span className="bold text-base font-bold">Reflexão:</span>
				</div>
				<div className="prose-lg">
					<h2 className="mb-4">{devocional.title}</h2>
					<p className="text-base/1 text-center italic">{devocional.verse}</p>
					<div className="text-justify">
						<PortableText value={devocional.content} />
					</div>
				</div>
			</div>
		</div>
	)
}
