<template>
  <div class="p-6 max-w-2xl mx-auto space-y-6">
    <NuxtLink to="/add">
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Book
      </button>
    </NuxtLink>
    <h1 class="text-3xl font-bold">📚 My Reading List</h1>



    <!-- 书籍列表 -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">Books ({{ books.length }})</h2>
      </template>

      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <ul v-else class="space-y-4">
        <li v-for="book in books" :key="book.id" class="flex justify-between items-center">
          <div>
            <div class="font-semibold">{{ book.title }}</div>
            <div class="text-sm text-gray-500">by {{ book.author }}</div>
            <div class="text-xs mt-1">
              Status:
              <span :class="book.is_read ? 'text-green-600' : 'text-gray-500'">
                {{ book.is_read ? 'Read' : 'Unread' }}
              </span>
            </div>
          </div>
          <UButton color="red" variant="soft" @click="deleteBook(book.id)">Remove</UButton>
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
 
const supabase = useNuxtApp().$supabase

const books = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const submitting = ref(false)

const form = ref({
  title: '',
  author: ''
})

const fetchBooks = async () => {
  loading.value = true
  const { data, error: fetchError } = await supabase.from('books').select('*').order('id', { ascending: false })
  if (fetchError) {
    error.value = fetchError.message
  } else {
    books.value = data || []
  }
  loading.value = false
}

const deleteBook = async (id: number) => {
  const { error: deleteError } = await supabase.from('books').delete().eq('id', id)
  if (deleteError) {
    alert(deleteError.message)
  } else {
    await fetchBooks()
  }
}

onMounted(fetchBooks)
</script>
