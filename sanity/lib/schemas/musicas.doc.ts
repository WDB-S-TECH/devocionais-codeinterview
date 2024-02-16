import { defineField, defineType, validation } from "sanity"

export default defineType({
	name: "musica",
	title: "Músicas",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Título",
			type: "string",
			validation: (validation) => validation.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			validation: (validation) => validation.required(),
			options: {
				source: "title",
				maxLength: 200, // will be ignored if slugify is set
				slugify: (input: string) =>
					input
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "") // Remove accents
						.replace(/\s+/g, "-") // Replace spaces with -
						.slice(0, 200), // Limit to 200 characters
			},
		}),
		defineField({
			name: "artist",
			title: "Compositor",
			type: "string",
			initialValue: "Anônimo",
		}),
		defineField({
			name: "lyrics",
			title: "Letra",
			type: "blockContent",
			validation: (validation) => validation.required(),
		}),
	],
})
