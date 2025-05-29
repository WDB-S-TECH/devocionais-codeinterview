"use client"

import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface ErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
	return (
		<main className="container mx-auto px-4 py-6">
			<div className="max-w-2xl mx-auto text-center space-y-6">
				<div className="flex justify-center">
					<AlertTriangle className="w-24 h-24 text-error" />
				</div>
				
				<div className="space-y-2">
					<h1 className="text-3xl font-bold">Erro na Dashboard</h1>
					<p className="text-base-content/70">
						Ocorreu um erro ao carregar os dados da dashboard. Tente novamente.
					</p>
					{process.env.NODE_ENV === "development" && (
						<details className="text-left bg-base-200 p-4 rounded-lg mt-4">
							<summary className="cursor-pointer font-semibold">Detalhes do erro</summary>
							<pre className="text-sm mt-2 overflow-auto">
								{error.message}
							</pre>
						</details>
					)}
				</div>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<button 
						onClick={reset}
						className="btn btn-primary"
					>
						<RefreshCw className="w-4 h-4" />
						Tentar Novamente
					</button>
					<Link 
						href="/"
						className="btn btn-outline"
					>
						<Home className="w-4 h-4" />
						Voltar aos Devocionais
					</Link>
				</div>
			</div>
		</main>
	)
} 