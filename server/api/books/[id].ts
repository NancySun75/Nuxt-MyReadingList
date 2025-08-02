import { readBody, getRouterParam } from 'h3'
import supabase from '~/server/utils/supabaseClient'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    return {
      success: false,
      message: 'Missing book id in route param.',
    }
  }
  if (event.method === 'GET') {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    data,
  }
}
  if (event.method === 'DELETE') {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: `Book with id ${id} deleted.` }
  }

  if (event.method === 'PATCH') {
    const body = await readBody(event)
    const { is_read } = body

    if (typeof is_read !== 'boolean') {
      return {
        success: false,
        message: 'Invalid request body. "is_read" must be boolean.',
      }
    }

    const { error } = await supabase
      .from('books')
      .update({ is_read })
      .eq('id', id)

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: `Book with id ${id} updated.` }
  }

  // Method not allowed
  return {
    statusCode: 405,
    body: { message: 'Method not allowed' },
  }
})
