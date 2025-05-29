import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export const devocionalByIdQuery = groq`
*[_type == 'devocional' && _id == $id && !(_id in path("drafts.**"))] {
  _id,
  date,
  title,
  verse,
  content,
  musicas[]->{
    _id,
    title,
    slug,
    artist,
    lyrics
  },
  program[]{
    step,
    colaborador->{
      _id,
      name
    },
    etd
  }
}[0]`

export type DevocionalDetail = {
	_id: string
	date: string
	title: string
	verse: string
	content: any
	musicas?: {
		_id: string
		title: string
		slug: {
			current: string
		}
		artist: string
		lyrics: any
	}[]
	program?: {
		step: string
		colaborador?: {
			_id: string
			name: string
		}
		etd: number
	}[]
}

export const fetchDevocionalById = async (id: string): Promise<DevocionalDetail | null> => {
	return await client.fetch(devocionalByIdQuery, { id }, {
		cache: 'force-cache',
		next: { 
			revalidate: 300, // revalidate every 5 minutes
			tags: ['devocional', `devocional-${id}`] 
		}
	})
} 