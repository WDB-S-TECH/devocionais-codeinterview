import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

import { makeSafeQueryRunner } from "groqd"

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
})

// 👇 Safe query runner
export const runQuery = makeSafeQueryRunner(
	(query, params: Record<string, unknown> = {}) => client.fetch(query, params)
)
