<script setup>
import Thumbnail01 from '../images/tutorial-01.jpg'
import Thumbnail02 from '../images/tutorial-02.jpg'

const items = [
  {
    title: 'Learn Programming in 2024',
    link: "#0",
    image: Thumbnail01,
  },
  {
    title: 'Learn Next.js in 20min',
    link: "#0",
    image: Thumbnail02,
  },
]
</script>

<template>
  <section>
    <h2 class="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Tutorials</h2>
    <div class="grid min-[580px]:grid-cols-2 gap-4 group">
      <template v-for="item in items">
        <article
          class="relative aspect-video rounded-xl shadow-lg overflow-hidden min-[580px]:odd:-rotate-2 min-[580px]:even:rotate-2 even:group-hover:rotate-0 odd:group-hover:rotate-0 transition duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]">
          <figure
            class="absolute inset-0 before:absolute before:inset-0 before:bg-linear-to-t before:to-75% before:from-gray-950/50 before:to-transparent">
            <img class="h-full w-full object-cover" :src="item.image" width="600" height="338" :alt="item.title" />
          </figure>
          <div class="relative flex flex-col justify-end h-full w-full px-6 py-5">
            <h3 class="text-sm font-medium text-white">
              <a class="before:absolute before:inset-0" :href="item.link">{{ item.title }}</a>
            </h3>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>
