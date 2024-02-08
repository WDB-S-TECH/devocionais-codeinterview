import { Menubar } from "../_components/Menu"

export default function StudioLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={"mx-auto max-w-2xl"}>
			<Menubar />
			<section className="px-4 sm:px-6 md:px-4">{children}</section>
		</div>
	)
}
