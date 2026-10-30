<script setup>
import { ref, onMounted } from 'vue'
import ThemeToggle from '../partials/ThemeToggle.vue'
import Footer from '../partials/Footer.vue'
import SignupForm from '../partials/SignupForm.vue'
import { sanityClient } from '../lib/sanity'
import roseLogo from '../images/rose-logo.webp'

const title = ref('ROSE 2027')
const subtitle = ref('Coming Soon')
const description = ref(
  "A new season of Ratatoskr One-day Series of Events is on the way. Sign up below and we'll let you know as soon as dates, venues and season passes are announced."
)

onMounted(async () => {
  try {
    const page = await sanityClient.fetch(`*[_type == "comingSoonPage"][0]{ title, subtitle, description }`)
    if (page?.title) title.value = page.title
    if (page?.subtitle) subtitle.value = page.subtitle
    if (page?.description) description.value = page.description
  } catch (err) {
    console.error('Failed to load coming soon page content from Sanity:', err)
  }
})
</script>

<template>
  <div class="overflow-hidden supports-[overflow:clip]:overflow-clip">
    <div class="max-w-[728px] mx-auto">
      <div class="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
        <div class="px-3 md:px-16">
          <div class="flex flex-col min-h-screen">

            <header class="text-center pt-6 grow flex flex-col justify-center">

              <ThemeToggle />

              <img class="inline-flex rounded-2xl shadow-lg mb-8 mx-auto" :src="roseLogo" width="150" height="150" alt="ROSE" />

              <h1 class="font-inter-tight font-black text-gray-800 dark:text-gray-100 text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6">
                {{ title }}<br />{{ subtitle }}
              </h1>

              <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-2">
                {{ description }}
              </p>

              <div class="mt-8 mb-4 max-w-sm mx-auto w-full">
                <SignupForm />
              </div>

            </header>

            <Footer />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
