"use client"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

import { Fragment } from "react"

export const QRButton = () => {
	const url = "https://devociotnal.agj.news"
	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-sm btn-ghost"
				onClick={() => {
					const modal = document.getElementById("qrcode-modal-menu-top")
					if (modal instanceof HTMLDialogElement) {
						modal.showModal()
					}
				}}
			>
				QR Code
			</button>
			<dialog
				id="qrcode-modal-menu-top"
				className="modal"
			>
				<div className="modal-box flex flex-col items-center justify-center gap-4 p-10">
					<span className="text-xl font-bold">AGJ Devocionais - QR Code</span>
					<QRCodeSVG
						value={url}
						size={256}
					/>
					<Link
						href={"/"}
						className="text-lg"
					>
						Acesse: {url}
					</Link>
					<span className="text-lg">Print e divulgue!</span>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button type="submit">close</button>
				</form>
			</dialog>
		</Fragment>
	)
}
