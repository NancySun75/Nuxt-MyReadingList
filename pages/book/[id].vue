<template>
  <div class="p-8">
    <div v-if="book">
      <h1 class="text-2xl font-bold mb-2">{{ book.title }}</h1>
      <p class="text-lg mb-1"><strong>Author:</strong> {{ book.author }}</p>
      <p class="text-gray-600 text-sm"><strong>ID:</strong> {{ book.id }}</p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface Book {
  id: number
  title: string
  author: string
}

const route = useRoute()
const bookId = Number(route.params.id)

const { data: book, error } = await useAsyncData<Book>('book', async () => {
  try {
    const res = await fetch(`/api/books/${bookId}`, { method: 'GET' })
    const json = await res.json()
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch book')
    }
    
    return json.data as Book
  } catch (err: any) {
    throw err
  }
})
</script>
