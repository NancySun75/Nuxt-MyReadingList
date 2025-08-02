// server/api/my-books.ts
import supabase from '~/server/utils/supabaseClient'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const method = event.method

  // GET: 获取所有 user_books 数据（含 book 的 title 和 author）
  if (method === 'GET') {
    const { data, error } = await supabase
      .from('user_books')
      .select('id, is_read, book_id, books(title, author)')
      .order('id', { ascending: true })

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, data }
  }

  
  if (method === 'POST') {
    const body = await readBody(event)
    const { book_id, is_read = false } = body

    if (!book_id) {
      return { success: false, message: 'Missing book_id' }
    }

    const { data, error } = await supabase
      .from('user_books')
      .insert([{ book_id, is_read }])
      .select()
      .single()

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, data }
  }

  return { success: false, message: 'Method not allowed' }
})
