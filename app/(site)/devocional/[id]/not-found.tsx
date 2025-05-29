import Link from "next/link"
import { FileX, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
	return (
		<main className="container mx-auto px-4 py-6">
			<div className="max-w-2xl mx-auto text-center space-y-6">
				<div className="flex justify-center">
					<FileX className="w-24 h-24 text-base-content/40" />
				</div>
				
				<div className="space-y-2">
					<h1 className="text-3xl font-bold">Devocional não encontrado</h1>
					<p className="text-base-content/70">
						O devocional que você está procurando não foi encontrado ou não existe.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Link 
						href="/"
						className="btn btn-primary"
					>
						<ArrowLeft className="w-4 h-4" />
						Voltar aos Devocionais
					</Link>
					<Link 
						href="/dashboard"
						className="btn btn-outline"
					>
						<Home className="w-4 h-4" />
						Ir para Dashboard
					</Link>
				</div>
			</div>
		</main>
	)
} 