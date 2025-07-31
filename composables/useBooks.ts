
import { ref } from 'vue'
import { useNuxtApp } from '#app'

export function useBooks() {
  const { $supabase } = useNuxtApp()

  const books = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBooks = async () => {
    loading.value = true
    const { data, error: fetchError } = await $supabase.from('books').select('*')
    if (fetchError) {
      error.value = fetchError.message
    } else {
      books.value = data || []
    }
    loading.value = false
  }

  return {
    books,
    loading,
    error,
    fetchBooks
  }
}
