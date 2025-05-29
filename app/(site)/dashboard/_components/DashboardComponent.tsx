import { 
	CalendarDays, 
	Music, 
	Users, 
	Clock, 
	BookOpen, 
	TrendingUp,
	Eye,
} from "lucide-react"
import { 
	fetchDashboardData, 
	DashboardDevocional, 
	DashboardMusica, 
	DashboardColaborador 
} from "./dashboardQuery"
import { StatsCard } from "./StatsCard"
import { RecentDevocionais } from "./RecentDevocionais"
import { TopMusicas } from "./TopMusicas"
import { ProgramOverview } from "./ProgramOverview"
import dayjs from "dayjs"

interface DashboardComponentProps {
	searchParams?: {
		periodo?: string
		ordenacao?: string
		limite?: string
	}
}

export async function DashboardComponent({ searchParams }: DashboardComponentProps) {
	const data = await fetchDashboardData()
	
	const periodo = searchParams?.periodo || 'todos'
	const ordenacao = searchParams?.ordenacao || 'recente'
	const limite = parseInt(searchParams?.limite || '5')

	// Filtrar por período
	let devocionaisFilterados = data.devocionais
	if (periodo !== 'todos') {
		const agora = dayjs()
		const diasAtras = {
			'30dias': 30,
			'90dias': 90, 
			'1ano': 365
		}[periodo] || 30

		devocionaisFilterados = data.devocionais.filter(devocional => 
			dayjs(devocional.date).isAfter(agora.subtract(diasAtras, 'days'))
		)
	}

	// Aplicar ordenação
	if (ordenacao === 'antigo') {
		devocionaisFilterados = [...devocionaisFilterados].sort((a, b) => 
			dayjs(a.date).diff(dayjs(b.date))
		)
	} else if (ordenacao === 'alfabetico') {
		devocionaisFilterados = [...devocionaisFilterados].sort((a, b) => 
			a.title.localeCompare(b.title)
		)
	}
	// 'recente' já é a ordenação padrão da query

	// Cálculo dos KPIs
	const totalDevocionais = devocionaisFilterados.length
	const totalMusicas = data.musicas.length
	const totalColaboradores = data.colaboradores.length
	
	// Tempo médio dos programas
	const tempoMedio = devocionaisFilterados.reduce((acc: number, devocional: DashboardDevocional) => {
		const tempoPrograma = devocional.program?.reduce((programAcc: number, item: any) => {
			return programAcc + (item.etd || 0)
		}, 0) || 0
		return acc + tempoPrograma
	}, 0) / totalDevocionais || 0

	// Músicas mais utilizadas
	const musicasCount = new Map<string, number>()
	devocionaisFilterados.forEach((devocional: DashboardDevocional) => {
		devocional.musicas?.forEach((musica: DashboardMusica) => {
			const count = musicasCount.get(musica._id) || 0
			musicasCount.set(musica._id, count + 1)
		})
	})

	const topMusicas = Array.from(musicasCount.entries())
		.map(([id, count]) => {
			const musica = data.musicas.find((m: DashboardMusica) => m._id === id)
			return { musica, count }
		})
		.filter(item => item.musica)
		.sort((a, b) => b.count - a.count)
		.slice(0, limite) as Array<{musica: DashboardMusica, count: number}>

	// Colaboradores mais ativos
	const colaboradoresCount = new Map<string, number>()
	devocionaisFilterados.forEach((devocional: DashboardDevocional) => {
		devocional.program?.forEach((item: any) => {
			if (item.colaborador) {
				const count = colaboradoresCount.get(item.colaborador._id) || 0
				colaboradoresCount.set(item.colaborador._id, count + 1)
			}
		})
	})

	const topColaboradores = Array.from(colaboradoresCount.entries())
		.map(([id, count]) => {
			const colaborador = data.colaboradores.find((c: DashboardColaborador) => c._id === id)
			return { colaborador, count }
		})
		.filter(item => item.colaborador)
		.sort((a, b) => b.count - a.count)
		.slice(0, limite) as Array<{colaborador: DashboardColaborador, count: number}>

	return (
		<div className="w-full space-y-8">
			{/* KPIs Grid */}
			<div className="w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatsCard
						title="Total de Devocionais"
						value={totalDevocionais}
						icon={<BookOpen className="w-6 h-6" />}
						description={periodo === 'todos' ? 'Devocionais cadastrados' : `No período selecionado`}
					/>
					<StatsCard
						title="Total de Músicas"
						value={totalMusicas}
						icon={<Music className="w-6 h-6" />}
						description="Músicas disponíveis"
					/>
					<StatsCard
						title="Colaboradores"
						value={totalColaboradores}
						icon={<Users className="w-6 h-6" />}
						description="Colaboradores ativos"
					/>
					<StatsCard
						title="Tempo Médio"
						value={`${Math.round(tempoMedio)}min`}
						icon={<Clock className="w-6 h-6" />}
						description="Duração média dos programas"
					/>
				</div>
			</div>

			{/* Seções Detalhadas */}
			<div className="w-full">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Devocionais Recentes */}
					<div className="card bg-base-100 border border-base-300">
						<div className="card-body p-6">
							<h2 className="card-title text-lg font-semibold flex items-center gap-2 mb-4">
								<CalendarDays className="w-5 h-5" />
								Devocionais Recentes
							</h2>
							<RecentDevocionais devocionais={devocionaisFilterados.slice(0, limite)} />
						</div>
					</div>

					{/* Músicas Mais Utilizadas */}
					<div className="card bg-base-100 border border-base-300">
						<div className="card-body p-6">
							<h2 className="card-title text-lg font-semibold flex items-center gap-2 mb-4">
								<TrendingUp className="w-5 h-5" />
								Músicas Mais Utilizadas
							</h2>
							<TopMusicas topMusicas={topMusicas} />
						</div>
					</div>
				</div>
			</div>

			{/* Visão Geral dos Programas */}
			<div className="w-full">
				<div className="card bg-base-100 border border-base-300">
					<div className="card-body p-6">
						<h2 className="card-title text-lg font-semibold flex items-center gap-2 mb-4">
							<Eye className="w-5 h-5" />
							Visão Geral dos Programas
						</h2>
						<ProgramOverview 
							devocionais={devocionaisFilterados} 
							topColaboradores={topColaboradores} 
						/>
					</div>
				</div>
			</div>
		</div>
	)
} 