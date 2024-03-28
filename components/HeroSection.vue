<template>
  <section class="bg-white">
    <div
      class="py-24 px-4 mx-auto max-w-screen-xl text-center lg:py-32 lg:px-12"
    >
      <h1
        class="mb-6 mx-auto text-3xl tracking-tight font-extrabold text-gray-900 md:text-5xl max-w-2xl"
      >
        Create Unlimited Puzzle Boards with PuzzleForgePro
      </h1>
      <p
        class="mb-8 mx-auto text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 max-w-5xl"
      >
        PuzzleForgePro provides the ultimate toolkit for creating puzzles that
        captivate and engage.
      </p>
      <NuxtLink
        to="/signup"
        class="inline-flex gap-2 justify-center items-center py-2 px-5 text-base font-medium text-center text-white rounded-full bg-black"
      >
        Get Starter
        <ChevronRightIcon class="w-4 h-6" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped></style>
