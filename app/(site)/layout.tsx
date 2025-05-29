import { Menubar } from "../_components/Menu"

export default function StudioLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen">
			<Menubar />
			<section className="w-full">{children}</section>
		</div>
	)
}
