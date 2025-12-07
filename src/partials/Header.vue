<script setup>
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="text-center pt-6">

    <!-- Dark mode toggle -->
    <ThemeToggle />
    <div class="mb-10">
      <img class="inline-flex rounded-2xl shadow-lg mb-4" src="https://aardvark-cdn.s3.eu-west-2.amazonaws.com/RO+SE.png" width="150" height="150" alt="ROSE" />
      <div class="mb-5">
        <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl mb-1">Ratatoskr One-day Series of Events</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">A series of one day Disc Golf events coming to the UK in 2026</p>
      </div>
      <a class="btn-sm text-gray-200 dark:text-gray-800 bg-linear-to-r from-gray-800 to-gray-700 dark:from-gray-300 dark:to-gray-100 dark:hover:bg-gray-100 shadow-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:opacity-20 dark:before:opacity-100 dark:before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1500"
        href="#0">Buy season pass</a>
      <div class="mt-4 mb-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">Ratatoskr Disc Golf Events, founded in late 2022 by Harry Messenger, 2-time BDGA TD of the year, is an English based company running some of the UK's highest quality and most inclusive events, including the British National Championships as well as the British Champs</p>
        <p class="pt-2 text-sm text-gray-600 dark:text-gray-400">Now focussing on a more accessible, cheaper one-day event series, ROSE is the result of community consultation and attempts to fill a gap in the amaetur one-day event market here in the UK.</p>
      </div>
    </div>
    <div class="group flex justify-center gap-4">
      <img
          class="rounded-xl object-cover even:rotate-2 odd:-rotate-2 even:group-hover:rotate-0 odd:group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg"
          src="https://aardvark-cdn.s3.eu-west-2.amazonaws.com/3A6A0860-274.JPG" width="245" height="160" alt="Header 01" />
      <img
          class="rounded-xl object-cover even:rotate-2 odd:-rotate-2 even:group-hover:rotate-0 odd:group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg"
          src="https://aardvark-cdn.s3.eu-west-2.amazonaws.com/048bd48c-03af-4046-bf2c-56aabc4d8882_rw_1920.jpg" width="245" height="160" alt="Header 02" />
      <img
          class="rounded-xl object-cover even:rotate-2 odd:-rotate-2 even:group-hover:rotate-0 odd:group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] shadow-lg"
          src="https://aardvark-cdn.s3.eu-west-2.amazonaws.com/4396bc7d-abb5-44f9-8896-a9195f426e30_rw_1920.jpg" width="245" height="160" alt="Header 03" />
    </div>
  </header>
</template>
