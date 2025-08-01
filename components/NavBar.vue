<template>
  <nav class="flex items-center justify-between h-16 border-b border-gray-200 backdrop-blur-md px-6">
    <!-- 品牌区域 -->
    <NuxtLink
      to="/"
      class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200 tracking-wide"
    >
      📚 MyLibrary
    </NuxtLink>

    <!-- list -->
    <ul class="flex space-x-6">
      <li>
        <NuxtLink
          to="/books"
          class="text-base font-medium text-gray-600 hover:text-blue-500 transition duration-200 border-b-2 border-transparent hover:border-blue-500 pb-1"
        >
          Books
        </NuxtLink>
      </li>
     
    </ul>
  </nav>
</template>
