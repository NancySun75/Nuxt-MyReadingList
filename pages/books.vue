<template>
  <div>
    <h2>Books</h2>
    <ul v-if="bookData && bookData.length">
      <li v-for="book in bookData" :key="book.id">
        {{ book.id }} - {{ book.title }} by {{ book.author }}
      </li>
    </ul>
    <p v-else>No books found.</p>
    <div v-if="error">
      <p style="color:red">Error: {{ error.message }}</p>
    </div>
  </div>

  <div>
    <h1 class="text-xl font-bold mb-4">Books List</h1>
    <ul>
      <li
        v-for="book in books"
        :key="book.id"
        class="mb-2"
      >
        <NuxtLink :to="`/book/${book.id}`" class="text-blue-500 underline">
          📚 <strong>{{ book.title }}</strong> by {{ book.author }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    { id: 4, title: "The Little Prince", author: "Antoine de Saint-Exupéry" },
    { id: 5, title: "Harry Potter", author: "J.K. Rowling" }
]

const { $supabase } = useNuxtApp()

const { data: bookData, error } = await useAsyncData('books', async () => {
  const { data, error } = await $supabase.from('books').select('id, title, author')
  if (error) throw error
  return data
})

console.log('bookData data:', bookData.value) //debug
console.log('error:', error) 
</script>
