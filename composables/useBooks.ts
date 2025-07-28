// composables/useBooks.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export function useBooks() {
  const supabase = useSupabaseClient()
  const books = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBooks = async () => {
    loading.value = true
    const { data, error: fetchError } = await supabase.from('books').select('*')
    if (fetchError) {
      error.value = fetchError.message
    } else {
      books.value = data
    }
    loading.value = false
  }

  const fetchBookById = async (id: string) => {
    loading.value = true
    const { data, error: fetchError } = await supabase.from('books').select('*').eq('id', id).single()
    loading.value = false
    if (fetchError) {
      throw fetchError
    }
    return data
  }

  return {
    books,
    loading,
    error,
    fetchBooks,
    fetchBookById
  }
}
