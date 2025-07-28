// composables/useBooks.ts
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

export function useBooks() {
  const config = useRuntimeConfig()

  const supabaseUrl: string = config.public.supabaseUrl
  const supabaseKey: string = config.public.supabaseKey

  const supabase = createClient(supabaseUrl, supabaseKey)

  const books = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchBooks = async () => {
    loading.value = true
    const { data, error: fetchError } = await supabase.from('books').select('*')
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
