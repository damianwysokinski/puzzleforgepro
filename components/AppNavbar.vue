<template>
  <nav class="bg-white border-b border-gray-200">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2"
    >
      <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="text-2xl font-semibold tracking-wide text-gray-900"
          >puzzleforgepro</span
        >
      </NuxtLink>
      <div class="flex items-center space-x-3">
        <NuxtLink
          to="/login"
          class="text-black font-semibold text-sm px-5 py-2.5 text-center"
          >Sign in</NuxtLink
        >
        <NuxtLink
          to="/signup"
          class="text-black bg-gray-100 border-2 border-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >Get started</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
