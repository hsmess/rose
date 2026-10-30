<script setup>
import { ref, computed, onMounted } from 'vue'
import { PortableText } from '@portabletext/vue'
import { sanityClient, urlForImage } from '../lib/sanity'
import ThemeToggle from '../partials/ThemeToggle.vue'
import Footer from '../partials/Footer.vue'
import SignupForm from '../partials/SignupForm.vue'
import SimpleTable from '../partials/SimpleTable.vue'
import ComingSoon from './ComingSoon.vue'
import roseLogo from '../images/rose-logo.webp'

const EVENT_FIELDS = `title, "slug": slug.current, date, location, "image": carouselImages[0]`

const QUERY = `*[_type == "homePage"][0]{
  showComingSoon,
  bannerText,
  title,
  updated,
  intro,
  sections[]{ heading, body },
  signupHeading,
  signupText,
  "nextEvent": coalesce(
    featuredEvent->{ ${EVENT_FIELDS} },
    *[_type == "event" && defined(date) && dateTime(date) >= now()] | order(date asc)[0]{ ${EVENT_FIELDS} }
  )
}`

const page = ref(null)
const loading = ref(true)
const loadError = ref(false)

onMounted(async () => {
  try {
    page.value = await sanityClient.fetch(QUERY)
  } catch (err) {
    console.error('Failed to load home page from Sanity:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
})

const components = { types: { simpleTable: SimpleTable } }

const nextEvent = computed(() => page.value?.nextEvent || null)

const eventImageUrl = computed(() =>
  nextEvent.value?.image
    ? urlForImage(nextEvent.value.image).width(1000).height(500).fit('crop').url()
    : null
)

const eventDate = computed(() => {
  if (!nextEvent.value?.date) return null
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(nextEvent.value.date))
})
</script>

<template>
  <ComingSoon v-if="!loading && page?.showComingSoon" />

  <div v-else class="overflow-hidden supports-[overflow:clip]:overflow-clip">
    <div v-if="page?.bannerText" class="bg-rose-red text-white text-center text-sm font-medium py-2 px-3">
      {{ page.bannerText }}
    </div>

    <div class="max-w-[728px] mx-auto">
      <div class="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
        <div class="px-3 md:px-16">
          <div class="flex flex-col min-h-screen">

            <header class="text-center pt-6">
              <ThemeToggle />
            </header>

            <main class="grow py-6 space-y-10">

              <p v-if="loading" class="text-center text-sm text-gray-500 dark:text-gray-400 py-24">Loading…</p>

              <div v-else-if="loadError || !page" class="text-center py-24 space-y-2">
                <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl">ROSE</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  We couldn't load this page. Please try again shortly.
                </p>
              </div>

              <template v-else>

                <div class="text-center space-y-3">
                  <img class="mx-auto rounded-2xl" :src="roseLogo" width="96" height="96" alt="ROSE" />
                  <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl">
                    {{ page.title }}
                  </h1>
                  <p v-if="page.updated" class="text-xs text-gray-500 dark:text-gray-400">{{ page.updated }}</p>
                </div>

                <router-link
                  v-if="nextEvent"
                  :to="`/events/${nextEvent.slug}`"
                  class="block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  <img v-if="eventImageUrl" :src="eventImageUrl" :alt="nextEvent.title" class="w-full h-48 sm:h-60 object-cover" />
                  <div class="p-4 space-y-1">
                    <p class="text-xs font-semibold uppercase tracking-wide text-rose-red">Next event</p>
                    <h2 class="font-inter-tight text-xl font-semibold text-gray-800 dark:text-gray-100">{{ nextEvent.title }}</h2>
                    <p v-if="eventDate || nextEvent.location" class="text-sm text-gray-600 dark:text-gray-400">
                      {{ [eventDate, nextEvent.location].filter(Boolean).join(' · ') }}
                    </p>
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200 underline underline-offset-2 pt-1">View event details</p>
                  </div>
                </router-link>

                <div v-if="page.intro?.length" class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                  <PortableText :value="page.intro" />
                </div>

                <section
                  v-for="(section, index) in page.sections || []"
                  :key="index"
                  class="border-t border-gray-200 dark:border-gray-700 pt-8"
                >
                  <h2 v-if="section.heading" class="font-inter-tight text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {{ section.heading }}
                  </h2>
                  <div class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                    <PortableText :value="section.body" :components="components" />
                  </div>
                </section>

                <section class="border-t border-gray-200 dark:border-gray-700 pt-8 pb-8">
                  <h2 class="font-inter-tight text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {{ page.signupHeading || 'Get updates' }}
                  </h2>
                  <p v-if="page.signupText" class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ page.signupText }}</p>
                  <div class="max-w-sm">
                    <SignupForm />
                  </div>
                </section>

              </template>

            </main>

            <Footer />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
