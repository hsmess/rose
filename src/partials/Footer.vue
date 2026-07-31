<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { sanityClient } from '../lib/sanity'

const FALLBACK_FACEBOOK_URL = 'https://facebook.com/ratatoskrdiscgolfevents'

const facebookUrl = ref(FALLBACK_FACEBOOK_URL)

onMounted(async () => {
  try {
    const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0]{ facebookUrl }`)
    if (settings?.facebookUrl) {
      facebookUrl.value = settings.facebookUrl
    }
  } catch (err) {
    console.error('Failed to load site settings from Sanity:', err)
  }
})
</script>

<template>
  <footer class="space-y-12 text-center pb-16">
    <!-- Initials logo -->
    <div class="space-y-6">
      <!-- Social icons -->
      <ul class="inline-flex gap-4">
        <li>
          <a class="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600/[0.65] shadow-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            :href="facebookUrl" aria-label="Facebook">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="10" height="15">
              <path
                d="m2.834 15-.022-6.563H0V5.626h2.813V3.75C2.813 1.22 4.38 0 6.636 0c1.081 0 2.01.08 2.281.116v2.645H7.353c-1.228 0-1.466.584-1.466 1.44v1.424h3.488l-.938 2.813h-2.55V15H2.834Z" />
            </svg>
          </a>
        </li>
      </ul>
      <!-- Copyright notes -->
      <p class="text-sm text-gray-400 dark:text-gray-600">&copy; hsmess.dev. All rights reserved.</p>
    </div>
  </footer>
</template>
