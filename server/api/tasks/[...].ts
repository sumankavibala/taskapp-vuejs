import { parseCookies } from 'h3';
import { apiProxy } from '@/server/utils/apiProxy';
import { useRouter } from 'vue-router';

export default defineEventHandler(async(event)=>{
  const router = useRouter();
  console.log('event--->>>',event);
  const cookies = parseCookies(event);
  console.log('cookies--->>>',cookies);
  const token = cookies.auth_token;
  console.log('token--->>',token);
  // If no token, return 401
  if(!token){
    setResponseStatus(event, 401);
    router.push('/')
    return {isSuccess:false, error: 'Unauthorized'};
  }
  // Proxy the request, attaching the token
  return await apiProxy(event, useRuntimeConfig().taskProxy, /^\/api\/tasks/,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})