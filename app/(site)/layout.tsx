import { Menubar } from "../_components/Menu"

export default function StudioLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={"mx-auto max-w-2xl"}>
			<Menubar />
			<section className="">{children}</section>
		</div>
	)
}
