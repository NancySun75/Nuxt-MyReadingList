// server/api/my-books/[id].ts
import supabase from '~/server/utils/supabaseClient'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const method = event.method
  const id = event.context.params?.id

  if (!id) {
    return { success: false, message: 'Missing ID in URL' }
  }

  // PATCH: 更新 is_read 状态
  if (method === 'PATCH') {
    const body = await readBody(event)
    const { is_read } = body

    const { data, error } = await supabase
      .from('user_books')
      .update({ is_read })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, data }
  }

  // DELETE: 删除记录
  if (method === 'DELETE') {
    const { error } = await supabase
      .from('user_books')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, message: error.message }
    }

    return { success: true, message: 'Deleted successfully' }
  }

  return { success: false, message: 'Method not allowed' }
})
