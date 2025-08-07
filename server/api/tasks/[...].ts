export default defineEventHandler(async(event) => {
  return await taskProxy(event, useRuntimeConfig().taskProxyUrl, /^\/api\/tasks/);
});
