import { createClient } from 'next-sanity'

import { apiVersion } from '../env'

export const client = createClient({
  projectId:"tb2j4x3j",
  dataset:'production',
  apiVersion,
  useCdn: true,
  token:process.env.SANITY_API_TOKEN
})
