<template>
  <UContainer class="max-w-md mx-auto p-4">
    <UPageHeader title="Add New Book" />

    <UForm :state="form" @submit.prevent="handleSubmit">
      <UFormGroup label="Title" :error="errors.title" class="mb-4">
        <UInput v-model="form.title" placeholder="Enter book title" />
      </UFormGroup>

      <UFormGroup label="Author" :error="errors.author" class="mb-4">
        <UInput v-model="form.author" placeholder="Enter author name" />
      </UFormGroup>

      <UFormGroup class="mb-4">
        <UCheckbox v-model="form.is_read" label="Already read?" />
      </UFormGroup>

      <UButton type="submit" color="primary">Add Book</UButton>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  title: '',
  author: '',
  is_read: false,
})

const errors = reactive({
  title: '',
  author: '',
})

const validate = () => {
  errors.title = ''
  errors.author = ''
  let isValid = true

  if (!form.title) {
    errors.title = 'Title is required'
    isValid = false
  }
  if (!form.author) {
    errors.author = 'Author is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  try {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const json = await res.json()

    if (!json.success) {
      alert('Failed to add book: ' + (json.message || 'Unknown error'))
      return
    }
    router.push('/')
  } catch (err: any) {
    alert('Failed to add book: ' + (err.message || 'Network error'))
  }
}
</script>
