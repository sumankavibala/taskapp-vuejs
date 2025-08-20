import { getQuery, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { page = 1, limit = 5 } = getQuery(event)
  const config = useRuntimeConfig();

  const response = await $fetch(`${config.NUXT_TASK_PROXY_URL}/tasks?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })

  return response
})
