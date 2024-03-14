"use client" // Error components must be Client Components

import { useEffect } from "react"

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<main>
			<div className="prose flex flex-col gap-4">
				<h3 className="text-center">Hum, estamos com um probleminha...</h3>
				<span>
					Algo deu errado ao tentar carregar esta página. Clique no botão para
					tentar novamente, se o erro persistir, entre em contato com o suporte.
				</span>
				<button
					className="btn btn-outline btn-sm self-end rounded-lg"
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
				>
					Tentar novamente
				</button>
				<div
					tabIndex={0}
					className="collapse-arrow border-base-300 bg-base-200 collapse border"
				>
					<input type="checkbox" />
					<div className="collapse-title text-sm font-medium">
						Mais detalhes...
					</div>
					<div className="collapse-content">
						<pre>
							<code>{JSON.stringify(error, null, 2)}</code>
						</pre>
					</div>
				</div>
			</div>
		</main>
	)
}
