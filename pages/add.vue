<template>
  <UContainer class="max-w-md mx-auto p-4">
    

    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Title" name="title" :error="getError('title')" class="mb-4">
        <UInput v-model="state.title" />
      </UFormField>

      <UFormField label="Author" name="author" :error="getError('author')" class="mb-4">
        <UInput v-model="state.author" />
      </UFormField>

      <UButton type="submit" color="primary">
        Add Book
      </UButton>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UForm, UFormField, UInput, UButton } from '#components'

const router = useRouter()


const state = reactive({
  title: '',
  author: '',
})


const errors = reactive<{ name: string; message: string }[]>([])

const getError = (fieldName: string) => {
  const err = errors.find(e => e.name === fieldName)
  return err ? err.message : ''
}

const validate = (currentState: typeof state) => {
  const errs: { name: string; message: string }[] = []

  if (!currentState.title.trim()) {
    errs.push({ name: 'title', message: 'Title is required' })
  }
  if (!currentState.author.trim()) {
    errs.push({ name: 'author', message: 'Author is required' })
  }

 
  errors.splice(0, errors.length, ...errs)

  return errs
}

// onSubmit 事件，event.data 是表单当前数据
const onSubmit = async (event: any) => {
  // event.data 已经是最新表单数据了
  const { title, author } = event.data

  try {
    // 1. 查询 books 表，看是否存在对应书籍
    const query = new URLSearchParams({
      title: title.trim(),
      author: author.trim(),
    }).toString()

    const checkRes = await fetch(`/api/books?${query}`)
    const checkJson = await checkRes.json()

    if (!checkJson.success || !checkJson.data) {
      alert('Book not found. Please check the title and author.')
      return
    }
    

    // 2. 拿到 books 表中对应书籍的 ID
    //const bookId = checkJson.data[0].id
    const bookId = checkJson.data.id

    // 3. 调用 user_books 接口添加到我的书单，默认 is_read 为 false
    const userBookRes = await fetch('/api/my-books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id: bookId,
        is_read: false,
      }),
    })

    const userBookJson = await userBookRes.json()

    if (!userBookJson.success) {
      alert('Failed to add to your reading list: ' + (userBookJson.message || 'Unknown error'))
      return
    }

    // 4. 添加成功，跳回主页
    router.push('/')
  } catch (err: any) {
    alert('Failed to add book: ' + (err.message || 'Network error'))
  }
}
</script>
