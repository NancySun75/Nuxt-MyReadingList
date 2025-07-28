<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">📚 My Reading List</h1>

    <!-- 添加书籍表单 -->
    <form @submit.prevent="addBook" class="mb-4 flex gap-2">
      <input v-model="newBook" type="text" placeholder="Add a new book"
             class="border px-2 py-1 rounded w-full" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
    </form>

    <!-- 书籍列表 -->
    <ul>
      <li v-for="(book, index) in books" :key="index" class="flex justify-between items-center py-2 border-b">
        <span>{{ book }}</span>
        <button @click="removeBook(index)" class="text-red-500 hover:underline">Remove</button>
      </li>
    </ul>
  </div>
  <div>
    <h1>Welcome to the Bookstore</h1>
    <NuxtLink to="/books" class="text-blue-500 underline">Go to Book List</NuxtLink>
  </div>
</template>


<!-- <script setup>
import { ref } from 'vue'

const newBook = ref('')
const books = ref(['The Great Gatsby', '1984', 'Pride and Prejudice'])

function addBook() {
  if (newBook.value.trim()) {
    books.value.push(newBook.value.trim())
    newBook.value = ''
  }
}

function removeBook(index) {
  books.value.splice(index, 1)
}
</script> -->

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBooks } from '~/composables/useBooks'

const { books, loading, error, fetchBooks } = useBooks()

onMounted(() => {
  fetchBooks()
})

function addBook() {
  if (newBook.value.trim()) {
    books.value.push(newBook.value.trim())
    newBook.value = ''
  }
}

function removeBook(index) {
  books.value.splice(index, 1)
}
</script>