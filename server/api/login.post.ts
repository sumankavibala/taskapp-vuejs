export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  interface loginDto {
    isSuccess: boolean;
    token: string;
  }
  console.log('first')
  try {
    const response: loginDto = await $fetch(`${config.NUXT_TASK_PROXY_URL}/login/login`, {
        method: "POST",
        body: {
          username: body.username,
          password: body.password,
        },
      });

    console.log('response--->>',response);

    if (response.isSuccess) {

      const token = response.token; // In a real app, this would be a JWT
      setCookie(event, "auth_token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });
      return { message: "Logged in" };

    } else {

      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });

    }

  } catch (error) {
    console.log('error--->>>',error);
    throw createError({
      statusCode: 500,
      statusMessage: "Login failed",
    });
  }
});
