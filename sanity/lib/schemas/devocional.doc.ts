import { defineField, defineType, validation } from "sanity"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"

export default defineType({
	name: "devocional",
	title: "Devocionais",
	type: "document",
	preview: {
		select: {
			title: "title",
			subtitle: "date",
		},
		prepare(selection) {
			return {
				title: selection.title,
				subtitle: dayjs(selection.subtitle)
					.locale("pt-br")
					.format("dddd, DD [de] MMMM [de] YYYY"),
			}
		},
	},
	fields: [
		defineField({
			name: "date",
			title: "Data",
			type: "date",
			validation: (validation) => validation.required(),
			initialValue: () => dayjs().format("YYYY-MM-DD"),
		}),
		defineField({
			name: "title",
			title: "Título",
			type: "string",
		}),
		defineField({
			name: "verse",
			title: "Versículo",
			description: "Referência do versículo",
			type: "text",
		}),
		defineField({
			name: "content",
			title: "Conteúdo",
			description: "Texto do devocional",
			type: "blockContent",
		}),
		{
			name: "program",
			title: "Programa",
			description: "Etapas do programa",
			type: "array",
			of: [
				{
					type: "object",
					preview: {
						select: {
							title: "step",
							subtitle: "colaborador.name",
							time: "etd",
						},
						prepare(selection) {
							return {
								title: selection.title,
								subtitle: `${selection.subtitle} - ${selection.time} min`,
							}
						},
					},
					fields: [
						{
							name: "step",
							title: "Etapa",
							type: "string",
						},
						{
							name: "etd",
							title: "Tempo Estimado de duração",
							type: "number",
							initialValue: 5,
						},
						{
							name: "colaborador",
							title: "Colaborador",
							type: "reference",
							to: [{ type: "colaborador" }],
						},
					],
				},
			],
		},
	],
})
