export default function Loading() {
	return (
		<main className="container mx-auto px-4 py-6">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header Skeleton */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-base-300">
					<div className="flex items-center gap-3">
						<div className="skeleton h-8 w-20"></div>
						<div className="skeleton h-8 w-24"></div>
					</div>
					<div className="text-right">
						<div className="skeleton h-4 w-24 mb-2"></div>
						<div className="skeleton h-5 w-48"></div>
					</div>
				</div>

				{/* Title and Verse Skeleton */}
				<div className="text-center space-y-4">
					<div className="skeleton h-12 w-3/4 mx-auto"></div>
					<div className="skeleton h-8 w-full mx-auto"></div>
				</div>

				{/* Stats Cards Skeleton */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="skeleton h-24 w-full"></div>
					))}
				</div>

				{/* Cards Skeleton */}
				{[1, 2, 3].map((i) => (
					<div key={i} className="skeleton h-48 w-full"></div>
				))}

				{/* Footer Skeleton */}
				<div className="flex justify-center pt-6 border-t border-base-300">
					<div className="skeleton h-12 w-48"></div>
				</div>
			</div>
		</main>
	)
} 