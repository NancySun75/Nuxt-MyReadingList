<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        📚 My Reading List
      </h1>

      <UButton to="/add" icon="i-heroicons-plus" color="primary">
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
              {{ book.title }} by {{ book.author }}
            </div>

            <div class="flex items-center gap-2">
              <UToggle
                v-model="book.is_read"
                @update:model-value="() => toggleReadStatus(book)"
                color="green"
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
import { ref, onMounted } from 'vue'

const supabase = useNuxtApp().$supabase

const books = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchBooks = async () => {
  loading.value = true
  const { data, error: fetchError } = await supabase
    .from('books')
    .select('*')
    .order('id', { ascending: false })

  if (fetchError) {
    error.value = fetchError.message
  } else {
    books.value = data || []
  }

  loading.value = false
}

const toggleReadStatus = async (book: any) => {
  const newStatus = !book.is_read

  try {
    await supabase
      .from('books')
      .update({ is_read: newStatus })
      .eq('id', book.id)

    // Update local value to avoid full re-fetch
    book.is_read = newStatus
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
