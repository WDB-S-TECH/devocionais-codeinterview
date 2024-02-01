import { defineField, defineType, validation } from "sanity"

export default defineType({
	name: "colaborador",
	title: "Colaboradores",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Nome",
			type: "string",
			validation: (validation) => validation.required(),
		}),
		defineField({
			name: "phone",
			title: "Telefone",
			type: "string",
		}),
	],
})
