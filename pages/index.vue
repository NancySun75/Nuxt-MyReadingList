<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        📚 My Reading List
      </h1>

      <UButton to="/add" color="primary">
        Add Book
      </UButton>
    </div>

    <!-- Book List Card -->
    <UCard>
      <template #header>
        <div class="text-xl font-semibold">
          Books ({{ books.length }})
        </div>
      </template>

      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>

      <ul v-else class="space-y-4">
        <li
          v-for="book in books"
          :key="book.id"
          class="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2 sm:gap-0"
        >
          <!-- Book Info and Toggle -->
          <div class="flex flex-col gap-1">
            <div class="font-medium text-gray-800">
              {{ book.books.title }} by {{ book.books.author }}
            </div>

            <div class="flex items-center gap-2">
              <USwitch
                :checked="book.is_read"
                :color="book.is_read ? 'success' : 'neutral'"
                @change="switchReadStatus(book)"
              />
              <span class="text-sm text-gray-600">
                {{ book.is_read ? 'Read' : 'Unread' }}
              </span>
            </div>
          </div>

          <!-- Remove Button -->
          <UButton color="error" variant="ghost" size="sm" @click="deleteBook(book.id)">
            Remove
          </UButton>
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { USwitch } from '#components'
import { ref, onMounted } from 'vue'

const books = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchBooks = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('/api/my-books', {
      method: 'GET',
    })
    const json = await res.json()
    if (!json.success) {
      error.value = json.message || 'Failed to fetch books'
      books.value = []
    } else {
      books.value = json.data || []
    }
  } catch (err: any) {
    error.value = err.message || 'Network error'
    books.value = []
  }
  loading.value = false
}

const switchReadStatus = async (book: any) => {
  const newStatus = !book.is_read
  try {
    const res = await fetch(`/api/my-books/${book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_read: newStatus }),
    })
    const json = await res.json()
    if (!json.success) {
      console.error('Failed to update status:', json.message)
    } else {
      book.is_read = newStatus
    }
  } catch (err) {
    console.error('Failed to update status:', err)
  }
}

const deleteBook = async (id: number) => {
  try {
    const res = await fetch(`/api/my-books/${id}`, {
      method: 'DELETE',
    })
    const json = await res.json()
    if (!json.success) {
      alert(json.message || 'Failed to delete book')
    } else {
      await fetchBooks()
    }
  } catch (err: any) {
    alert(err.message || 'Network error')
  }
}

onMounted(fetchBooks)
</script>