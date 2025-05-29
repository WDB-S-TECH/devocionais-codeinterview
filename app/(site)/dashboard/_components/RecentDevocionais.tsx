import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import { ChevronRight } from "lucide-react"
import { DashboardDevocional } from "./dashboardQuery"

interface RecentDevocionalProps {
	devocionais: DashboardDevocional[]
}

export function RecentDevocionais({ devocionais }: RecentDevocionalProps) {
	if (!devocionais.length) {
		return (
			<div className="text-center py-8 text-base-content/60">
				<p>Nenhum devocional encontrado</p>
			</div>
		)
	}

	return (
		<div className="space-y-3">
			{devocionais.map((devocional) => (
				<Link
					key={devocional._id}
					href={`/devocional/${devocional._id}`}
					className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors group"
				>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-sm line-clamp-1 group-hover:text-base-content">
							{devocional.title}
						</h3>
						<p className="text-xs text-base-content/60 mt-1">
							{dayjs(devocional.date)
								.locale("pt-br")
								.format("DD [de] MMMM [de] YYYY")}
						</p>
						<div className="flex items-center gap-4 mt-2 text-xs text-base-content/50">
							<span>{devocional.musicas?.length || 0} músicas</span>
							<span>{devocional.program?.length || 0} etapas</span>
						</div>
					</div>
					<ChevronRight className="w-4 h-4 text-base-content/40 group-hover:text-base-content flex-shrink-0 ml-2" />
				</Link>
			))}
		</div>
	)
} 