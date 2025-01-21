export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-13'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tb2j4x3j",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue(v: string | undefined, errorMessage: string | undefined) {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
