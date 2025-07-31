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

const supabase = useNuxtApp().$supabase
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

  const { error } = await supabase.from('books').insert([form])
  if (!error) {
    router.push('/')
  } else {
    alert('Failed to add book: ' + error.message)
  }
}
</script>
