<template>
  <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
    <div style="width: 300px;">
      <h1 style="justify-self: center;">Login</h1>
      <form @submit.prevent="login"  style="display: flex; flex-direction: column;">
        <p>Username</p>
        <input v-model="username" type="username" placeholder="Username" />
        <p>Password</p>
        <input v-model="password" type="password" placeholder="Password" style="margin-bottom: 36px;"/>
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const login = async () => {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })
    router.push('/tasks')
  } catch (err) {
    error.value = 'Invalid credentials'
  }
}
</script>
