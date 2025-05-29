import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export const devocionalQuery = groq`
*[_type == 'devocional' && !(_id in path("drafts.**")) ]
{
  _id,
  date,
  title,
  verse,
  content,
	musicas[]->{
		...,
	},
  program[]{
    step,
    colaborador->{name},
    etd
    }
} | order(date desc)`

export type Devocional = {
	_id: string
	date: string
	title: string
	verse: string
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	content: any
	musicas: {
		title: string
		slug: {
			current: string
		}
		artist: string
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		lyrics: any
	}[]

	program: {
		step: string
		colaborador: {
			name: string
		}
		etd: string
	}[]
}

export const fetchDevocional = async (): Promise<Devocional[]> => {
	return await client.fetch(devocionalQuery, {}, {
		cache: 'no-store',
		next: { 
			revalidate: 120, // revalidate every 2 minutes  
			tags: ['devocionais', 'home'] 
		}
	})
}
