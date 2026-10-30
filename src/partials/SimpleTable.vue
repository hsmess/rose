<script setup>
import { computed } from 'vue'

const props = defineProps({ value: { type: Object, required: true } })

const rows = computed(() => (props.value?.rows || []).map((r) => r.cells || []))
const header = computed(() => rows.value[0] || [])
const body = computed(() => rows.value.slice(1))
</script>

<template>
  <div class="not-prose overflow-x-auto my-4">
    <table class="w-full text-sm text-left border-collapse">
      <thead>
        <tr class="border-b-2 border-gray-300 dark:border-gray-600">
          <th v-for="(cell, i) in header" :key="i" class="py-2 pr-4 font-semibold text-gray-800 dark:text-gray-100 align-bottom">
            {{ cell }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in body" :key="r" class="border-b border-gray-200 dark:border-gray-700">
          <td v-for="(cell, c) in row" :key="c" class="py-1.5 pr-4 text-gray-600 dark:text-gray-400" :class="c === 0 ? 'font-medium text-gray-800 dark:text-gray-200' : ''">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
