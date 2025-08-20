<template>
  <div>
    <h1 style="justify-self: center;">Tasks to-do</h1>
    <input v-model="newTask" placeholder="Add new tasks" style="margin-right: 10px;"></input>
    <button style="margin-bottom: 10px; margin-right: 12px;" @click="handleSave" >click me</button>
    <button @click="logout">Logout</button>
      <li v-for="(task, index) in tasks" :key="index" style="display: flex; gap: 12px; margin-top: 10px;">
        >
        <div style="width: 147px;">
          {{ task.title }} - {{ task.completed }}
        </div>
        <button @click="handleCompleted(task.title,task.id)" >Completed</button>
        <button style="width: 63px;" @click="handleDelete(task.id)">delete</button>
      </li>
    
    <p v-if="error">{{ error }}</p>
  </div>
      <div style="display: flex; gap:12px; margin-top: 12px;">
      <button @click="handlePageChange('prev')">Previous Page</button>
      <button @click="handlePageChange('next')">Next page</button>
    </div>
</template>

<script setup>
const router = useRouter()

const tasks = ref([])
const error = ref(null)
const newTask = ref('')
const currentPageNumber = ref(1)
const totalPages = ref(1)

const fetchTask = async (pageNumber = 1) => {
  try {
    currentPageNumber.value = pageNumber
    const response = await $fetch(`/api/tasks?page=${pageNumber}&limit=5`)
    if (response.isSuccess) {
      totalPages.value = response.metaData.totalPages
      tasks.value = response.tasks
    } else {
      error.value = 'Failed to load tasks'
    }
  } catch (err) {
    error.value = 'Unauthorized or server error'
  }
}

const handleSave = async() => {
  const response = await $fetch(`/api/tasks`, {
    method: 'POST',
    body: {
      title: newTask.value
    },
  })
  if(response.isSuccess){
    tasks.value.push(response);
    newTask.value = ''
  }
  fetchTask(currentPageNumber.value);
}


const handlePageChange = async(action) => {
  if(action === 'next') {
    if(totalPages.value !== currentPageNumber.value){
      currentPageNumber.value++;
      fetchTask(currentPageNumber.value);
    }
  } else 
  if (action === 'prev') {
    if(currentPageNumber.value > 1){
      currentPageNumber.value--;
      fetchTask(currentPageNumber.value);
    }
  }
}

const handleCompleted = async (title, id) => {
  try {
    const response = await $fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: { title, completed: true }
    })
    if (response.isSuccess) {
      fetchTask(currentPageNumber.value)
    }
  } catch (err) {
    error.value = 'Failed to mark task as completed'
  }
}

const handleDelete = async (id) => {
  try {
    const response = await $fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    })
    if (response.isSuccess) {
      fetchTask(currentPageNumber.value)
    }
  } catch (err) {
    error.value = 'Failed to delete task'
  }
}

const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' })
  router.push('/')
}

onMounted(() => {
  fetchTask()
})
</script>

