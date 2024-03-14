import { z } from "zod"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export const devocionalQuery = groq`
*[_type == 'devocional' && !(_id in path("drafts.**")) ]
{
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
	return await client.fetch(devocionalQuery)
}
