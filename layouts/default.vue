<!-- layouts/default.vue -->
<template>
  <div>
    <NavBar />
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
</script>
