<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <h1>{{ book.title }}</h1>
    <p>Author: {{ book.author }}</p>
    <p>ID: {{ book.id }}</p>
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
const bookId = route.params.id as string

const { data: book, error, pending } = await useFetch<Book>(`/api/books/${bookId}`, {
  transform: (json: any) => {
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch book')
    }
    return json.data as Book
  }
})

</script>
