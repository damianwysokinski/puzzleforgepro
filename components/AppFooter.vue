<template>
  <footer class="p-4 bg-white md:p-8 lg:p-10 border-t">
    <div class="mx-auto max-w-screen-xl text-center">
      <NuxtLink
        to="/"
        class="text-2xl font-semibold tracking-wide text-gray-900"
      >
        puzzleforgepro
      </NuxtLink>
      <ul
        class="flex flex-wrap justify-center items-center gap-4 mt-6 mb-6 text-gray-900"
      >
        <li>
          <NuxtLink to="/" class="hover:underline">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="hover:underline">Terms of Use</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" class="hover:underline">Privacy Policy</NuxtLink>
        </li>
      </ul>
      <span class="text-sm text-gray-500 sm:text-center"
        >© {{ new Date().getFullYear() }}
        <NuxtLink to="/" class="hover:underline">PuzzleForgePro™</NuxtLink>.
        All Rights Reserved.</span
      >
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
