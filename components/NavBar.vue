<!-- components/NavBar.vue -->
<template>
  <nav class="bg-gray-100 p-4 shadow">
    <ul class="flex space-x-4">
      <li><NuxtLink to="/" class="text-blue-600 hover:underline">Home</NuxtLink></li>
    </ul>
    <ul class="flex space-x-20">
      <li><NuxtLink to="/books" class="text-blue-600 hover:underline">Books</NuxtLink></li>
    </ul>
  </nav>
</template>
