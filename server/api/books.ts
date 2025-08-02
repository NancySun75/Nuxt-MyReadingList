// server/api/books.ts
import { readBody, getQuery, getMethod } from 'h3'
import supabase from '~/server/utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  
  if (method === 'GET') {
    const query = getQuery(event)

    if (query.title && query.author) {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('title', query.title)
        .eq('author', query.author)
        .maybeSingle()

      if (error) {
        return { success: false, message: error.message }
      }

      return { success: true, data }
    }

   
    const { data, error } = await supabase.from('books').select('*')
    if (error) {
      return { success: false, message: error.message }
    }
    return { success: true, data }
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { title, author, is_read } = body

    if (!title || !author) {
      return {
        success: false,
        message: '"title" and "author" are required',
      }
    }

    const { data, error } = await supabase
      .from('books')
      .insert([{ title, author, is_read: is_read ?? false }])
      .select()

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, data: data[0] }
  }

  return {
    statusCode: 405,
    success: false,
    message: `Method ${method} not allowed`,
  }
})
