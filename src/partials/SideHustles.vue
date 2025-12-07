vue<script setup>
const items = [
  {
    title: 'Accessible for women',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>',
    color: 'text-pink-500',
    description: 'Portaloo or bathroom facilities at all courses, sanitary supplies available at events, accessible layouts, and opportunities to sign up with a friend and be on the same card in the first round.'
  },
  {
    title: 'A great first event',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    color: 'text-green-500',
    description: 'Shorter layouts, beginner divisions (MA4 and FA4) available, opportunities to sign up with a friend and be on the same card in the first round, plus a free disc if it\'s your first ever PDGA event.'
  },
  {
    title: 'Masters (40+) accessible events',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    color: 'text-blue-500',
    description: 'Masters divisions running for 40+, 50+ and 60+, one day events, and option to play only one round at 2-round events (flex starts are only 1 round anyway).'
  },
  {
    title: 'Off season social activity',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    color: 'text-orange-500',
    description: 'Community events like disc swaps being organised, hopefully having a retailer at some events, and shotgun starts with lunch break together.'
  },
]
</script>

<template>
  <section>
    <h2 class="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Events for everyone</h2>
    <div class="grid min-[580px]:grid-cols-2 gap-4">
      <template v-for="(item, index) in items">
        <article
            class="p-5 rounded-xl"
            :class="[index === 0 || index === 3 ? 'bg-linear-to-tr from-gray-100 to-gray-50 dark:bg-linear-to-tr dark:from-gray-800 dark:to-gray-800/[0.65]' : '']">
          <div
              class="w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600/[0.65] shadow-xs mb-4"
              :class="item.color"
              v-html="item.icon"></div>
          <div class="space-y-1">
            <h3 class="font-semibold text-gray-800 dark:text-gray-100">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
          </div>
        </article>
      </template>
    </div>
  </section>
</template>