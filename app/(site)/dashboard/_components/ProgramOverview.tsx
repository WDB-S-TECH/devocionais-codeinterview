import { Users, Clock, Award } from "lucide-react"
import { DashboardDevocional, DashboardColaborador } from "./dashboardQuery"

interface ProgramOverviewProps {
	devocionais: DashboardDevocional[]
	topColaboradores: Array<{
		colaborador: DashboardColaborador
		count: number
	}>
}

export function ProgramOverview({ devocionais, topColaboradores }: ProgramOverviewProps) {
	// Estatísticas dos programas
	const totalEtapas = devocionais.reduce((acc, devocional) => {
		return acc + (devocional.program?.length || 0)
	}, 0)

	const tempoTotal = devocionais.reduce((acc, devocional) => {
		const tempoPrograma = devocional.program?.reduce((programAcc, item) => {
			return programAcc + (item.etd || 0)
		}, 0) || 0
		return acc + tempoPrograma
	}, 0)

	const devocionalMaisLongo = devocionais.reduce((max, devocional) => {
		const tempoPrograma = devocional.program?.reduce((programAcc, item) => {
			return programAcc + (item.etd || 0)
		}, 0) || 0
		
		const maxTempo = max.program?.reduce((programAcc, item) => {
			return programAcc + (item.etd || 0)
		}, 0) || 0

		return tempoPrograma > maxTempo ? devocional : max
	}, devocionais[0])

	return (
		<div className="space-y-6">
			{/* Estatísticas Gerais */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="stat bg-base-200 rounded-lg border border-base-300">
					<div className="stat-figure text-base-content">
						<Clock className="w-8 h-8" />
					</div>
					<div className="stat-title">Tempo Total</div>
					<div className="stat-value text-base-content">{Math.round(tempoTotal)}min</div>
					<div className="stat-desc">Todos os programas</div>
				</div>

				<div className="stat bg-base-200 rounded-lg border border-base-300">
					<div className="stat-figure text-base-content">
						<Users className="w-8 h-8" />
					</div>
					<div className="stat-title">Total de Etapas</div>
					<div className="stat-value text-base-content">{totalEtapas}</div>
					<div className="stat-desc">Em todos os devocionais</div>
				</div>

				<div className="stat bg-base-200 rounded-lg border border-base-300">
					<div className="stat-figure text-base-content">
						<Award className="w-8 h-8" />
					</div>
					<div className="stat-title">Programa Mais Longo</div>
					<div className="stat-value text-base-content">
						{devocionalMaisLongo?.program?.reduce((acc, item) => acc + (item.etd || 0), 0) || 0}min
					</div>
					<div className="stat-desc truncate">{devocionalMaisLongo?.title}</div>
				</div>
			</div>

			{/* Top Colaboradores */}
			{topColaboradores.length > 0 && (
				<div>
					<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Users className="w-5 h-5" />
						Colaboradores Mais Ativos
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{topColaboradores.map(({ colaborador, count }, index) => (
							<div
								key={colaborador._id}
								className="flex items-center gap-3 p-3 bg-base-200 rounded-lg border border-base-300"
							>
								<div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-base-content text-base-100">
									{index + 1}
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-medium text-sm truncate">{colaborador.name}</p>
									<p className="text-xs text-base-content/60">
										{count} participação{count > 1 ? 'ões' : ''}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
} 