<template>
  <div class="p-8">
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">Tailwind & Nuxt UI Test</h2>
      </template>
      <p>This card proves that Nuxt UI and Tailwind are working!</p>
      <template #footer>
        <UButton color="primary">Click me</UButton>
      </template>
    </UCard>
  </div>

  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-8 flex items-center justify-center">
    <div class="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full transition duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-4">Tailwind & Nuxt UI Test</h1>
      <p class="text-gray-600 mb-6">This card proves that Nuxt UI and Tailwind are working!</p>
      <button
        class="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
      >
        Click me
      </button>
    </div>
  </div>


</template>
