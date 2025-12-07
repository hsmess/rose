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
    <h2 class="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Pricing</h2>

    <div class="space-y-3 mb-4">
      <div class="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          This event series will have 50% off entry fees for female amateur competitors thanks to a kind grant from the UKWDGA.
        </p>
      </div>

    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
        <tr class="bg-orange-100 dark:bg-orange-950/50">
          <th class="text-left p-4 font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-orange-500 dark:border-orange-600">Event Type</th>
          <th class="text-right p-4 font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-orange-500 dark:border-orange-600">Full Price</th>
          <th class="text-right p-4 font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-orange-500 dark:border-orange-600">Female Amateur</th>
          <th class="text-right p-4 font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-orange-500 dark:border-orange-600">Junior</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd:bg-gray-50 dark:odd:bg-gray-800/50">
          <td class="p-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">Series Events</td>
          <td class="p-4 text-right text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">£25</td>
          <td class="p-4 text-right text-orange-600 dark:text-orange-400 font-medium border-b border-gray-200 dark:border-gray-700">£12.50</td>
          <td class="p-4 text-right text-orange-600 dark:text-orange-400 font-medium border-b border-gray-200 dark:border-gray-700">£12.50</td>
        </tr>
        <tr class="odd:bg-gray-50 dark:odd:bg-gray-800/50">
          <td class="p-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">Flex Start Events</td>
          <td class="p-4 text-right text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">£10</td>
          <td class="p-4 text-right text-orange-600 dark:text-orange-400 font-medium border-b border-gray-200 dark:border-gray-700">£5</td>
          <td class="p-4 text-right text-orange-600 dark:text-orange-400 font-medium border-b border-gray-200 dark:border-gray-700">£5</td>
        </tr>
        <tr class="bg-orange-50 dark:bg-orange-950/30">
          <td class="p-4 font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-orange-500 dark:border-orange-600">
            Season Pass
            <div class="text-xs font-normal text-gray-600 dark:text-gray-400 mt-1">Free entry to all events</div>
          </td>
          <td class="p-4 text-right font-semibold text-gray-800 dark:text-gray-100 border-b-2 border-orange-500 dark:border-orange-600">£100</td>
          <td class="p-4 text-right font-semibold text-orange-600 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-600">£50</td>
          <td class="p-4 text-right font-semibold text-orange-600 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-600">£50</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center mt-4">

      <div class="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          If this is your first ever PDGA event, you'll receive a free disc!
        </p>
      </div>
    </div>
  </section>
</template>
