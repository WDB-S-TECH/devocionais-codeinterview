import { ReactNode } from "react"

interface StatsCardProps {
	title: string
	value: number | string
	icon: ReactNode
	description: string
}

export function StatsCard({ title, value, icon, description }: StatsCardProps) {
	return (
		<div className="card bg-base-100 border border-base-300">
			<div className="card-body p-6">
				<div className="flex items-center justify-between">
					<div className="flex-1 min-w-0">
						<p className="text-base-content/60 text-sm truncate">{title}</p>
						<p className="text-3xl font-bold text-base-content">{value}</p>
						<p className="text-base-content/50 text-xs mt-1 truncate">{description}</p>
					</div>
					<div className="flex-shrink-0 ml-4 p-3 rounded-lg bg-base-200 text-base-content">
						{icon}
					</div>
				</div>
			</div>
		</div>
	)
} 