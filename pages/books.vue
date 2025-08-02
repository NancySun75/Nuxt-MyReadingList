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
      Error: {{ error.message || error }}
    </UAlert>
  </UContainer>
</template>

<script setup lang="ts">
interface Book {
  id: number
  title: string
  author: string
}

const { data: bookData, error } = await useAsyncData<Book[]>('books', async () => {
  try {
    const res = await fetch('/api/books', { method: 'GET' })
    const json = await res.json()
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch books')
    }
    // 注意你的后端接口 data 里面可能会有更多字段，这里取id,title,author即可
    return json.data.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author,
    })) as Book[]
  } catch (err: any) {
    throw err
  }
})
</script>
