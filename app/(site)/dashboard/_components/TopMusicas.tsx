import Link from "next/link"
import { Music2 } from "lucide-react"
import { DashboardMusica } from "./dashboardQuery"

interface TopMusicasProps {
	topMusicas: Array<{
		musica: DashboardMusica
		count: number
	}>
}

export function TopMusicas({ topMusicas }: TopMusicasProps) {
	if (!topMusicas.length) {
		return (
			<div className="text-center py-8 text-base-content/60">
				<p>Nenhuma música encontrada</p>
			</div>
		)
	}

	return (
		<div className="space-y-3">
			{topMusicas.map(({ musica, count }, index) => (
				<Link
					key={musica._id}
					href={`/musicas/${musica.slug.current}`}
					className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors group"
				>
					<div className="flex items-center justify-center w-8 h-8 rounded-full bg-base-content text-base-100 text-sm font-bold">
						{index + 1}
					</div>
					<Music2 className="w-4 h-4 text-base-content/60" />
					<div className="flex-1 min-w-0">
						<h3 className="font-medium text-sm line-clamp-1 group-hover:text-base-content">
							{musica.title}
						</h3>
						<p className="text-xs text-base-content/60 truncate">
							{musica.artist}
						</p>
					</div>
					<div className="text-right flex-shrink-0">
						<p className="text-sm font-semibold">{count}</p>
						<p className="text-xs text-base-content/50">usos</p>
					</div>
				</Link>
			))}
		</div>
	)
} 