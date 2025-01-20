export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-13'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || "skqqjqJlL3iemuJO4eJIuJtz2YoJWJ1hRC91ydqERfFmtPGsj0EEz9M8GbXCPABrqeNoJVpBkGGjsJkmVL6gNeJLDOGKHP56OBIXM1jVOifHMSkoa1N6cfuUevIl75YYLGCspGewlpuBkY8cpNXePePBYkN1qNgDGuwutrcchfmFNo8fGf4K",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue(v, errorMessage) {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
