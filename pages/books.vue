<template>
  <div>
    <h2>Books</h2>
    <ul v-if="bookData && bookData.length">
      <li v-for="book in bookData" :key="book.id">
        <NuxtLink :to="`/book/${book.id}`" class="text-blue-500 underline">
          📚 <strong>{{ book.title }}</strong> by {{ book.author }}
        </NuxtLink>
      </li>
    </ul>
    <p v-else>No books found.</p>
    <div v-if="error">
      <p style="color:red">Error: {{ error.message }}</p>
    </div>
  </div>

</template>

<script setup lang="ts">



const supabase = useNuxtApp().$supabase

const { data: bookData, error } = await useAsyncData('books', async () => {
  const { data, error } = await supabase.from('books').select('id, title, author')
  if (error) throw error
  return data
})

console.log('bookData data:', bookData.value) //debug
console.log('error:', error) 
</script>
