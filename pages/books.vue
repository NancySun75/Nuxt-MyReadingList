<template>
  <UContainer>
    <UPageHeader title="Books" />

    <div v-if="bookData && bookData.length">
      <UCard v-for="book in bookData" :key="book.id" class="mb-4">
        <template #header>
          <NuxtLink :to="`/book/${book.id}`" class="text-blue-600 hover:underline">
            📚 <strong>{{ book.title }}</strong>
          </NuxtLink>
        </template>
        <p class="text-gray-700">by {{ book.author }}</p>
      </UCard>
    </div>

    <UAlert v-else-if="!bookData || bookData.length === 0" color="neutral" variant="subtle">
      No books found.
    </UAlert>

    <UAlert v-if="error" color="error" variant="solid" class="mt-4">
      Error: {{ error.message }}
    </UAlert>
  </UContainer>
</template>

<script setup lang="ts">
interface Book {
  id: number
  title: string
  author: string
}

const supabase = useNuxtApp().$supabase

const { data: bookData, error } = await useAsyncData<Book[]>('books', async () => {
  const { data, error } = await supabase.from('books').select('id, title, author')
  if (error) throw error
  return data!
}
)
</script>
