<template>
  <UNavbar height="4rem" class="border-b border-gray-200 backdrop-blur-md">
    <UNavbarBrand>
      <NuxtLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-800 transition duration-200 tracking-wide">
        📚 MyLibrary
      </NuxtLink>
    </UNavbarBrand>

    <UNavbarMenu>
      <UNavbarItem>
        <NuxtLink
          to="/books"
          class="text-base font-medium text-gray-600 hover:text-blue-500 transition duration-200 border-b-2 border-transparent hover:border-blue-500 pb-1"
        >
          Books
        </NuxtLink>
      </UNavbarItem>
    </UNavbarMenu>
  </UNavbar>
</template>
