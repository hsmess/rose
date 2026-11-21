<script setup>
// items: [{ label, to? }]. The last item is the current page (no link).
defineProps({
  items: { type: Array, required: true },
  center: { type: Boolean, default: false },
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="text-xs text-gray-500 dark:text-gray-400">
    <ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1" :class="center ? 'justify-center' : ''">
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <router-link
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-gray-800 dark:hover:text-gray-200 underline underline-offset-2"
        >
          {{ item.label }}
        </router-link>
        <span v-else aria-current="page" class="text-gray-700 dark:text-gray-300">{{ item.label }}</span>
        <span v-if="index < items.length - 1" aria-hidden="true">›</span>
      </li>
    </ol>
  </nav>
</template>
