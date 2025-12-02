<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ThemeToggle from "./ThemeToggle.vue";

const targetDate = new Date('2025-12-08T18:00:00Z') // 6pm GMT on 8th January 2025
const now = ref(Date.now())
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

const timeRemaining = computed(() => {
  const diff = targetDate - now.value

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isFinished: false }
})

const emit = defineEmits(['countdown-finished'])

// Emit event when countdown finishes
computed(() => {
  if (timeRemaining.value.isFinished) {
    emit('countdown-finished')
  }
  return timeRemaining.value.isFinished
})
</script>

<template>
  <ThemeToggle />
  <div class="flex flex-col items-center justify-center min-h-screen space-y-8">
    <!-- Logo -->
    <div class="w-[250px] h-[250px] rounded-3xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
      <img
          src="https://aardvark-cdn.s3.eu-west-2.amazonaws.com/RO+SE.png"
          alt="Logo"
          class="w-full h-full object-cover rounded-3xl"
      />
    </div>

    <!-- Countdown Timer -->
    <div class="text-center">
      <div class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        <span v-if="!timeRemaining.isFinished">
          {{ timeRemaining.days }}d {{ timeRemaining.hours }}h {{ timeRemaining.minutes }}m {{ timeRemaining.seconds }}s
        </span>
        <span v-else>
          0d 0h 0m 0s
        </span>
      </div>
    </div>
  </div>
</template>