import { readBody, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)
  const config = useRuntimeConfig();

  const response = await $fetch(`${config.NUXT_TASK_PROXY_URL}/tasks`, {
    method: 'POST',
    body,
    headers: { Authorization: `Bearer ${token}` }
  })

  return response
})
