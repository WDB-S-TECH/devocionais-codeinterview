import { PortableText } from "@portabletext/react"
import Link from "next/link"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import { 
	ArrowLeft, 
	CalendarDays, 
	ChevronRight, 
	Clock, 
	ListCollapse, 
	Music2, 
	MusicIcon, 
	User, 
	Mic2,
	ExternalLink,
	Home
} from "lucide-react"
import { DevocionalDetail } from "./devocionalByIdQuery"
import { Breadcrumbs } from "./Breadcrumbs"

interface DevocionalDetailComponentProps {
	devocional: DevocionalDetail
}

export function DevocionalDetailComponent({ devocional }: DevocionalDetailComponentProps) {
	const totalTempo = devocional.program?.reduce((acc, item) => acc + (item.etd || 0), 0) || 0

	const breadcrumbItems = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: devocional.title, current: true }
	]

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Breadcrumbs */}
			<Breadcrumbs items={breadcrumbItems} />

			{/* Header com Navegação */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-base-300">
				<div className="flex items-center gap-3">
					<Link 
						href="/" 
						className="btn btn-ghost btn-sm"
						aria-label="Voltar para a lista de devocionais"
					>
						<ArrowLeft className="w-4 h-4" />
						Voltar
					</Link>
					<Link 
						href="/dashboard" 
						className="btn btn-ghost btn-sm"
						aria-label="Ir para dashboard"
					>
						<Home className="w-4 h-4" />
						Dashboard
					</Link>
				</div>
				<div className="text-right">
					<p className="text-sm text-base-content/60">Publicado em</p>
					<p className="font-semibold">
						{dayjs(devocional.date)
							.locale("pt-br")
							.format("dddd, D [de] MMMM [de] YYYY")
							.replace(/^\w/, (c) => c.toUpperCase())}
					</p>
				</div>
			</div>

			{/* Título e Versículo */}
			<div className="text-center space-y-4">
				<h1 className="text-3xl sm:text-4xl font-bold leading-tight">
					{devocional.title}
				</h1>
				<blockquote className="text-lg sm:text-xl italic text-base-content/80 border-l-4 border-base-content pl-4 py-2">
					{devocional.verse}
				</blockquote>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="stat bg-base-200 rounded-lg border border-base-300">
					<div className="stat-figure text-base-content">
						<Clock className="w-6 h-6" />
					</div>
					<div className="stat-title">Duração</div>
					<div className="stat-value text-base-content">{totalTempo}min</div>
					<div className="stat-desc">Tempo estimado</div>
				</div>
				<div className="stat bg-base-200 rounded-lg border border-base-300">
					<div className="stat-figure text-base-content">
						<ListCollapse className="w-6 h-6" />
					</div>
					<div className="stat-title">Etapas</div>
					<div className="stat-value text-base-content">{devocional.program?.length || 0}</div>
					<div className="stat-desc">No programa</div>
				</div>
				<div className="stat bg-base-200 rounded-lg border border-base-300">
					<div className="stat-figure text-base-content">
						<MusicIcon className="w-6 h-6" />
					</div>
					<div className="stat-title">Músicas</div>
					<div className="stat-value text-base-content">{devocional.musicas?.length || 0}</div>
					<div className="stat-desc">Selecionadas</div>
				</div>
			</div>

			{/* Programação */}
			<div className="card bg-base-100 border border-base-300">
				<div className="card-body p-6">
					<h2 className="card-title text-lg font-semibold flex items-center gap-2 mb-4">
						<ListCollapse className="text-base-content w-6 h-6" />
						Programação
					</h2>
					{!devocional.program?.length ? (
						<div className="text-center py-8 text-base-content/60">
							<p>Sem programação definida</p>
						</div>
					) : (
						<div className="space-y-3">
							{devocional.program.map((item, index) => (
								<div 
									key={`${item.step}-${index}`}
									className="flex items-center gap-4 p-4 bg-base-200 rounded-lg border border-base-300"
								>
									<div className="flex items-center justify-center w-8 h-8 rounded-full bg-base-content text-base-100 text-sm font-bold">
										{index + 1}
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold">{item.step}</h3>
										{item.colaborador && (
											<p className="text-sm text-base-content/70 flex items-center gap-1">
												<User className="w-4 h-4" />
												{item.colaborador.name}
											</p>
										)}
									</div>
									{item.etd && (
										<div className="text-right flex-shrink-0">
											<p className="font-semibold flex items-center gap-1">
												<Clock className="w-4 h-4" />
												{item.etd}min
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Músicas */}
			<div className="card bg-base-100 border border-base-300">
				<div className="card-body p-6">
					<h2 className="card-title text-lg font-semibold flex items-center gap-2 mb-4">
						<MusicIcon className="text-base-content w-6 h-6" />
						Músicas
					</h2>
					{!devocional.musicas?.length ? (
						<div className="text-center py-8 text-base-content/60">
							<p>Sem músicas na programação</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{devocional.musicas
								.sort((a, b) => a.title.localeCompare(b.title))
								.map((musica) => (
									<Link
										key={musica._id}
										href={`/musicas/${musica.slug.current}`}
										className="flex items-center gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors group border border-base-300"
									>
										<Music2 className="w-5 h-5 text-base-content" />
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold group-hover:text-base-content">
												{musica.title}
											</h3>
											<p className="text-sm text-base-content/70 truncate">
												{musica.artist}
											</p>
										</div>
										<ExternalLink className="w-4 h-4 text-base-content/40 group-hover:text-base-content flex-shrink-0" />
									</Link>
								))}
						</div>
					)}
				</div>
			</div>

			{/* Reflexão */}
			<div className="card bg-base-100 border border-base-300">
				<div className="card-body p-6">
					<h2 className="card-title text-lg font-semibold flex items-center gap-2 mb-4">
						<Mic2 className="text-base-content w-6 h-6" />
						Reflexão
					</h2>
					<div className="prose prose-lg max-w-none">
						<div className="text-justify leading-relaxed">
							<PortableText value={devocional.content} />
						</div>
					</div>
				</div>
			</div>

			{/* Footer com navegação */}
			<div className="flex justify-center pt-6 border-t border-base-300">
				<Link 
					href="/" 
					className="btn btn-neutral"
				>
					<ArrowLeft className="w-4 h-4" />
					Voltar aos Devocionais
				</Link>
			</div>
		</div>
	)
} 