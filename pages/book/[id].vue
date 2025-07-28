<template>
<div class="book-detail">
<h1>Book Details</h1>
<div v-if="book">
<h2>{{ book.title }}</h2>
<p><strong>Author:</strong> {{ book.author }}</p>
<p><strong>Description:</strong> {{ book.description }}</p>
</div>
<div v-else>
<p>Book not found.</p>
</div>
</div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
// 模拟数据：和 books.vue 中保持一致
const books = [
{ id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A novel set in the 1920s.' },
{ id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A story of racial injustice.' },
{ id: 3, title: '1984', author: 'George Orwell', description: 'A dystopian novel.' },
{ id: 4, title: "The Little Prince", author: "Antoine de Saint-Exupéry", description: 'A classic book.' },
{ id: 5, title: "Harry Potter", author: "J.K. Rowling", description: 'A welcomed novel.' }
]
const route = useRoute()
const book = ref(null)
onMounted(() => {
console.log('route.params.id:', route.params.id)
const id = Number(route.params.id)
book.value = books.find(b => b.id === id)
console.log('book:', book.value)
})
</script>
