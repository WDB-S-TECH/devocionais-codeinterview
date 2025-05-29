import { Metadata } from "next"
import { Suspense } from "react"
import { DashboardComponent } from "./_components/DashboardComponent"
import { fetchDashboardData } from "./_components/dashboardQuery"

export const revalidate = 60 // revalidate every minute

export const metadata: Metadata = {
	title: "Dashboard - AGJ Devocionais",
	description: "Visão geral dos devocionais e estatísticas",
}

interface DashboardPageProps {
	searchParams: {
		periodo?: string
		ordenacao?: string
		limite?: string
	}
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {	
	return (
		<main className="container mx-auto px-4 py-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-center mb-2">Dashboard</h1>
				<p className="text-center text-base-content/70">
					Visão geral dos devocionais e estatísticas
				</p>
			</div>
			<Suspense fallback={
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="skeleton h-32 w-full"></div>
						))}
					</div>
					<div className="skeleton h-96 w-full"></div>
				</div>
			}>
				<DashboardComponent searchParams={searchParams} />
			</Suspense>
		</main>
	)
} 