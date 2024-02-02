import { q } from "groqd"
import { z } from "zod"

export const musicasQuery = q("*")
	.filter("_type == 'musica'")

	.grab({
		title: q.string(),
		slug: q.slug("slug"),
		artist: q.string().optional(),
		lyrics: q.array(q.contentBlock()),
	})

export const musicaBySlugQuery = q("*")
	.filter("_type == 'musica' && slug.current == $slug")
	.grab({
		title: q.string(),
		slug: q.slug("slug"),
		artist: q.string().optional(),
		lyrics: q.array(q.contentBlock()),
	})

export type Musica = z.infer<typeof musicasQuery.schema>[number]
