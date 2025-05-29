export default function Loading() {
	return (
		<main className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<div className="skeleton h-8 w-48 mx-auto mb-2"></div>
				<div className="skeleton h-4 w-64 mx-auto"></div>
			</div>
			
			<div className="space-y-6">
				{/* KPIs Grid Skeleton */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="skeleton h-32 w-full"></div>
					))}
				</div>

				{/* Seções Detalhadas Skeleton */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{[1, 2].map((i) => (
						<div key={i} className="skeleton h-80 w-full"></div>
					))}
				</div>

				{/* Visão Geral dos Programas Skeleton */}
				<div className="skeleton h-96 w-full"></div>
			</div>
		</main>
	)
} 