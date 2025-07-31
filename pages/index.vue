<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
      📚 My Reading List
    </h1>

    <NuxtLink
      to="/add"
      class="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200 text-sm"
      custom
      v-slot="{ navigate, href }"
    >
      <button :href="href" @click="navigate" type="button">
        Add Book
      </button>
    </NuxtLink>
  </div>

  <!-- Book list -->
  <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">
      Books ({{ books.length }})
    </h2>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <ul v-else class="space-y-4">
      <li
        v-for="book in books"
        :key="book.id"
        class="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-0"
      >
        <div>
          <div class="font-semibold text-gray-800">
            {{ book.title }} by {{ book.author }}
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" :checked="book.is_read" @change="toggleReadStatus(book)" />
            <div class="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition-colors">
              <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
            </div>
            <span class="ml-2 text-sm text-gray-700">{{ book.is_read ? 'Read' : 'Unread' }}</span>
          </label>
        </div>

        <button
          class="text-red-600 hover:text-red-800 text-sm"
          @click="deleteBook(book.id)"
        >
          Remove
        </button>
      </li>
    </ul>
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

const toggleReadStatus = async (book: any) => {
  const newStatus = book.is_read ? 'Read' : 'Unread'

  try {
    await $fetch(`/api/books/${book.id}`, {
      method: 'PATCH',
      body: { status: newStatus }
    })
    await fetchBooks() 
  } catch (error) {
    console.error('Failed to update status:', error)
  }
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
