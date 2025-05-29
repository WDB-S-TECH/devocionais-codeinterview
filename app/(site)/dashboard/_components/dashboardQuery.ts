import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export const dashboardQuery = groq`{
  "devocionais": *[_type == 'devocional' && !(_id in path("drafts.**"))] {
    _id,
    date,
    title,
    verse,
    content,
    musicas[]->{
      _id,
      title,
      slug,
      artist
    },
    program[]{
      step,
      colaborador->{
        _id,
        name
      },
      etd
    }
  } | order(date desc),
  "musicas": *[_type == 'musica' && !(_id in path("drafts.**"))] {
    _id,
    title,
    slug,
    artist
  } | order(title asc),
  "colaboradores": *[_type == 'colaborador' && !(_id in path("drafts.**"))] {
    _id,
    name
  } | order(name asc)
}`

export type DashboardDevocional = {
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

export type DashboardMusica = {
	_id: string
	title: string
	slug: {
		current: string
	}
	artist: string
}

export type DashboardColaborador = {
	_id: string
	name: string
}

export type DashboardData = {
	devocionais: DashboardDevocional[]
	musicas: DashboardMusica[]
	colaboradores: DashboardColaborador[]
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
	return await client.fetch(dashboardQuery, {}, {
		next: { 
			revalidate: 60, // revalidate every 60 seconds
			tags: ['dashboard', 'devocionais', 'musicas', 'colaboradores'] 
		}
	})
} 