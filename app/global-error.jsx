"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

export default function GlobalError({ error }) {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html lang="pt-BR">
			<main>
				<div className="prose flex flex-col gap-4">
					<h3 className="text-center">Hum, estamos com um probleminha...</h3>
					<span>
						Algo deu errado ao tentar carregar esta página. Clique no botão para
						tentar novamente, se o erro persistir, entre em contato com o
						suporte.
					</span>
					<button
						className="btn btn-outline btn-sm self-end rounded-lg"
						onClick={() => reset()}
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
		</html>
	)
}
