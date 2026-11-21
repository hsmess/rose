<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PortableText } from '@portabletext/vue'
import { sanityClient, urlForImage } from '../lib/sanity'
import ThemeToggle from '../partials/ThemeToggle.vue'
import Footer from '../partials/Footer.vue'
import SeasonCalendar from '../partials/SeasonCalendar.vue'
import roseLogo from '../images/rose-logo.webp'

const route = useRoute()
const router = useRouter()

const season = ref(null)
const loading = ref(true)
const loadError = ref(false)

const QUERY = `*[_type == "season" && slug.current == $slug][0]{
  title,
  image,
  imageAlt,
  intro,
  "events": events[]->{ title, calendarLabel, "slug": slug.current, date, status }
}`

const load = async (slug) => {
  loading.value = true
  loadError.value = false
  season.value = null
  try {
    const result = await sanityClient.fetch(QUERY, { slug })
    if (!result) {
      // Not a season: the "/rose-..." address may be a short link to an event
      router.replace(`/events/${slug}`)
      return
    }
    season.value = result
  } catch (err) {
    console.error('Failed to load season from Sanity:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => load(route.params.slug))
watch(() => route.params.slug, (slug) => slug && load(slug))

const imageUrl = computed(() =>
  season.value?.image ? urlForImage(season.value.image).width(1200).auto('format').url() : null
)
</script>

<template>
  <div class="overflow-hidden supports-[overflow:clip]:overflow-clip">
    <div class="max-w-[728px] mx-auto">
      <div class="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
        <div class="px-3 md:px-16">
          <div class="flex flex-col min-h-screen">

            <header class="text-center pt-6">
              <ThemeToggle />
            </header>

            <main class="grow py-6 space-y-10">

              <p v-if="loading" class="text-center text-sm text-gray-500 dark:text-gray-400 py-24">Loading…</p>

              <div v-else-if="loadError" class="text-center py-24 space-y-2">
                <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl">Couldn't load this season</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">Something went wrong. Please try again shortly.</p>
              </div>

              <template v-else-if="season">
                <div class="text-center space-y-3">
                  <router-link to="/">
                    <img class="mx-auto rounded-2xl" :src="roseLogo" width="96" height="96" alt="ROSE home" />
                  </router-link>
                  <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl">
                    {{ season.title }}
                  </h1>
                </div>

                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  :alt="season.imageAlt || `${season.title} schedule`"
                  class="w-full h-auto rounded-lg"
                />

                <div v-if="season.intro?.length" class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                  <PortableText :value="season.intro" />
                </div>

                <section class="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 class="font-inter-tight text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Calendar</h2>
                  <SeasonCalendar :events="season.events" />
                </section>

                <p class="text-center">
                  <router-link to="/" class="text-sm text-gray-800 dark:text-gray-200 underline underline-offset-2">Back to home</router-link>
                </p>
              </template>

            </main>

            <Footer />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
