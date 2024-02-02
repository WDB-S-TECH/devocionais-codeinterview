import { StudioPageComponent } from "./studio"

import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Studio - AGJ Devocionais",
	description: "Editor de conteúdo do AGJ Devocionais.",
}

export default function StudioPage() {
	return <StudioPageComponent />
}
