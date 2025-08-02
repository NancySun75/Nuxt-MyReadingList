import { ref } from 'vue'

export function useBooks() {
  const books = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBooks = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/books', { method: 'GET' })
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
    } finally {
      loading.value = false
    }
  }

  return {
    books,
    loading,
    error,
    fetchBooks,
  }
}
