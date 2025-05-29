import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
	items: Array<{
		label: string
		href?: string
		current?: boolean
	}>
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav className="breadcrumbs text-sm">
			<ul className="flex items-center space-x-2">
				<li>
					<Link href="/" className="flex items-center gap-1 hover:text-base-content transition-colors">
						<Home className="w-4 h-4" />
						<span>Início</span>
					</Link>
				</li>
				{items.map((item, index) => (
					<li key={index} className="flex items-center space-x-2">
						<ChevronRight className="w-4 h-4 text-base-content/40" />
						{item.href && !item.current ? (
							<Link href={item.href} className="hover:text-base-content transition-colors">
								{item.label}
							</Link>
						) : (
							<span className={item.current ? "text-base-content font-medium" : "text-base-content/60"}>
								{item.label}
							</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
} 