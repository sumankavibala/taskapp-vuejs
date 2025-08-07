<template>
  <div>
    <h1>Tasks to-do</h1>
    <input v-model="newTask" placeholder="Add new tasks" style="margin-right: 10px;"></input>
    <button style="margin-bottom: 10px;" @click="handleSave" >click me</button>

    <div>
      <li v-for="(task, index) in tasks" :key="index" style="display: flex; gap: 12px; margin-top: 10px;">
        >
        <div style="width: 147px;">
          {{ task.title }} - {{ task.completed }}
        </div>
        <button @click="handleCompleted(task.title,task.id)" >Completed</button>
        <button style="width: 63px;" @click="handleDelete(task.id)">delete</button>
      </li>
    </div>

    <div style="display: flex; gap:12px; margin-top: 12px;">
      <button @click="handlePageChange('prev')">Previous Page</button>
      <button @click="handlePageChange('next')">Next page</button>
    </div>
  </div>
</template>

<script setup>
const tasks = ref([]);
const newTask = ref('');
const currentPageNumber = ref();
const totalPages = ref();

const fetchTask = async(pageNumber = 1) => {
  currentPageNumber.value = pageNumber;
  const response = await $fetch(`http://localhost:3002/tasks?page=${pageNumber}&limit=5`, {
    method: 'GET'
  });
  
  if(response.isSuccess){
    totalPages.value = response.metaData.totalPages;
    tasks.value = [];
    tasks.value.push(...response.tasks)
  }
}

const handleSave = async() => {
  const response = await $fetch(`http://localhost:3002/tasks`, {
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

const handleCompleted = async(title,id) => {
  const response = await $fetch(`http://localhost:3002/tasks/${id}`,{
    method: 'PUT',
    body:{
      title: title,
      completed: 'true'
    }
  })
  if(response.isSuccess){
    fetchTask(currentPageNumber.value);
  }
}

const handleDelete = async(id) => {
  const response = await $fetch(`http://localhost:3002/tasks/${id}`,{
    method: 'DELETE',
  });
  if(response.isSuccess) {
    tasks.value.splice(id, 1);
    fetchTask(currentPageNumber.value);
  }
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

onMounted(async()=>{
  fetchTask();
})
</script>