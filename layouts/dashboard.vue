<template>
  <div>
    <div class="antialiased">
      <nav
        class="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50"
      >
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex justify-start items-center">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
            >
              <Bars3CenterLeftIcon class="w-6 h-6" />
              <span class="sr-only">Toggle sidebar</span>
            </button>
            <NuxtLink to="/" class="flex items-center justify-between mr-4">
              <span class="self-center text-2xl font-semibold whitespace-nowrap"
                >puzzleforgepro</span
              >
            </NuxtLink>
          </div>
          <div class="flex items-center lg:order-2">
            <button
              id="user-menu-button"
              type="button"
              class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span class="sr-only">Open user menu</span>
              <span
                class="w-10 h-10 rounded-full grid items-center text-white text-lg uppercase"
              ></span>
            </button>
          </div>
        </div>
      </nav>

      <aside
        id="drawer-navigation"
        class="fixed top-0 left-0 z-40 w-80 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0"
        aria-label="Sidenav"
      >
        <div class="overflow-y-auto py-5 px-3 h-full bg-white">
          <slot name="sidebar" />
        </div>
      </aside>

      <main class="p-4 md:ml-80 h-auto pt-20">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars3CenterLeftIcon } from "@heroicons/vue/24/solid";
</script>

<style scoped></style>
