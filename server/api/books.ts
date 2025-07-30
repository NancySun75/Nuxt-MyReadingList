import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, readBody, getMethod } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

  const method = getMethod(event)

  if (method === 'GET') {
    const { data, error } = await supabase.from('books').select('*')
    if (error) return { error: error.message }
    return { data }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { title, author, is_read } = body

    if (!title || !author) {
      return { error: 'title and author are required' }
    }

    const { data, error } = await supabase.from('books').insert([
      { title, author, is_read: is_read ?? false }
    ]).select()

    if (error) return { error: error.message }

    return { data: data[0] }
  }

  return { error: `Method ${method} not allowed` }
})
