import { readBody, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = event.context.params.id
  const body = await readBody(event)
  const config = useRuntimeConfig();

  const response = await $fetch(`${config.NUXT_TASK_PROXY_URL}/tasks/${id}`, {
    method: 'PUT',
    body,
    headers: { Authorization: `Bearer ${token}` }
  })

  return response
})
