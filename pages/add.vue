<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add New Book</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block mb-1">Title</label>
        <input v-model="form.title" type="text" class="border rounded p-2 w-full" />
        <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
      </div>

      <div class="mb-4">
        <label class="block mb-1">Author</label>
        <input v-model="form.author" type="text" class="border rounded p-2 w-full" />
        <p v-if="errors.author" class="text-red-500 text-sm">{{ errors.author }}</p>
      </div>

      <div class="mb-4">
        <label class="flex items-center">
          <input v-model="form.is_read" type="checkbox" class="mr-2" />
          <span>Already read?</span>
        </label>
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useNuxtApp().$supabase
const router = useRouter()

const form = ref({
  title: '',
  author: '',
  is_read: false,
})

const errors = ref({
  title: '',
  author: '',
})

const validate = () => {
  errors.value = { title: '', author: '' }
  let isValid = true
  if (!form.value.title) {
    errors.value.title = 'Title is required'
    isValid = false
  }
  if (!form.value.author) {
    errors.value.author = 'Author is required'
    isValid = false
  }
  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  const { error } = await supabase.from('books').insert([form.value])
  if (!error) {
    router.push('/')
  } else {
    alert('Failed to add book: ' + error.message)
  }
}
</script>
