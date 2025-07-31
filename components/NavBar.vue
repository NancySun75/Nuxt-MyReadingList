<template>
  <nav class="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 backdrop-blur-md">
    <!-- left Logo -->
    <div>
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200 tracking-wide"
      >
        📚 MyLibrary
      </NuxtLink>
    </div>

    <!-- right navigation -->
    <ul class="flex space-x-8 text-base font-medium">
      <li>
        <NuxtLink
          to="/books"
          class="text-gray-600 hover:text-blue-500 transition duration-200 border-b-2 border-transparent hover:border-blue-500 pb-1"
        >
          Books
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
