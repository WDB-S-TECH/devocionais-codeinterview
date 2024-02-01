import { type SchemaTypeDefinition } from "sanity"
import blockContent from "./lib/schemas/blockContent"
import musica from "./lib/schemas/musicas.doc"
import devocional from "./lib/schemas/devocional.doc"
import colaborador from "./lib/schemas/colaborador.doc"

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [blockContent, musica, devocional, colaborador],
}
