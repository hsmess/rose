<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="text-center pt-6">
    <!-- Dark mode toggle -->
    <ThemeToggle />
    <!-- Intro -->
    <div class="mb-10">
      <img class="inline-flex rounded-full shadow-lg mb-4" src="../images/user-image.jpg" width="48" height="48" alt="Jordan Walker" />
      <div class="mb-5">
        <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl mb-1">Jordan Walker</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">Frontend developer and community
          builder from NYC 🇺🇸</p>
      </div>
      <a class="btn-sm text-gray-200 dark:text-gray-800 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-300 dark:to-gray-100 dark:hover:bg-gray-100 shadow relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
        href="#0">Available For Work</a>
    </div>
    <div class="group flex justify-center gap-4">
      <img
        class="rounded-xl even:rotate-2 odd:-rotate-2 group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg"
        src="../images/header-image-01.jpg" width="245" height="160" alt="Header 01" />
      <img
        class="rounded-xl even:rotate-2 odd:-rotate-2 group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg"
        src="../images/header-image-02.jpg" width="245" height="160" alt="Header 02" />
      <img
        class="rounded-xl even:rotate-2 odd:-rotate-2 group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg"
        src="../images/header-image-03.jpg" width="245" height="160" alt="Header 03" />
    </div>
  </header>
</template>
