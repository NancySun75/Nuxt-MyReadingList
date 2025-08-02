<template>
  <nav class="flex items-center px-10">
    <NuxtLink
      to="/"
      class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200 tracking-wide"
    >
      📚 My Library
    </NuxtLink>

    <!-- list -->
    <ul class="flex items-center px-10">
      <li>
        <NuxtLink
          to="/books"
          class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200"
        >
        📚 Book Repository
        </NuxtLink>
      </li>
     
    </ul>
  </nav>
</template>
