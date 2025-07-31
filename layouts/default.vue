<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow max-w-3xl mx-auto w-full p-4">
      <slot />
    </main>
    <Footer/>
  </div>
</template>

<script setup>
  import NavBar from '~/components/NavBar.vue'
  import Footer from '~/components/Footer.vue'
</script>