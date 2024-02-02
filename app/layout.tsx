import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "AGJ Devocionais",
	description: "Devocionais da Associaçao Guiomar Jesus",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={cn(inter.className)}>{children}</body>
		</html>
	)
}
