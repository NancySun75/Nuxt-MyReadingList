import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  const id = getRouterParam(event, 'id') 

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

  // not support other method
  return {
    statusCode: 405,
    body: { message: 'Method not allowed' },
  }
})
