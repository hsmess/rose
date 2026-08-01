<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'
import { sanityClient, urlForImage } from '../lib/sanity'
import ThemeToggle from '../partials/ThemeToggle.vue'
import Carousel from '../partials/Carousel.vue'
import Divider from '../partials/Divider.vue'
import Footer from '../partials/Footer.vue'

const DEFAULT_LOGO_URL = 'https://aardvark-cdn.s3.eu-west-2.amazonaws.com/RO+SE.png'

const route = useRoute()

const event = ref(null)
const loading = ref(true)
const notFound = ref(false)
const loadError = ref(false)

const QUERY = `*[_type == "event" && slug.current == $slug][0]{
  title,
  slug,
  logo,
  date,
  location,
  status,
  summary,
  carouselImages,
  sections[]{ heading, body, image, hideImageOnMobile },
  registrationUrl
}`

const loadEvent = async (slug) => {
  loading.value = true
  notFound.value = false
  loadError.value = false
  event.value = null

  try {
    const result = await sanityClient.fetch(QUERY, { slug })
    if (!result) {
      notFound.value = true
    } else {
      event.value = result
    }
  } catch (err) {
    console.error('Failed to load event from Sanity:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => loadEvent(route.params.slug))
watch(() => route.params.slug, (slug) => loadEvent(slug))

const formattedDate = computed(() => {
  if (!event.value?.date) return null
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(event.value.date))
})

const logoUrl = computed(() => {
  if (event.value?.logo) {
    return urlForImage(event.value.logo).width(200).height(200).fit('crop').url()
  }
  return DEFAULT_LOGO_URL
})
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

              <p v-if="loading" class="text-center text-sm text-gray-500 dark:text-gray-400 py-24">
                Loading event…
              </p>

              <div v-else-if="loadError" class="text-center py-24 space-y-2">
                <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl">Couldn't load this event</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Something went wrong fetching this page. Please try again shortly.
                </p>
              </div>

              <div v-else-if="notFound" class="text-center py-24 space-y-2">
                <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl">Event not found</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  We couldn't find an event at this address. It may have been moved or the link is out of date.
                </p>
                <router-link to="/" class="inline-block text-sm text-gray-800 dark:text-gray-200 underline underline-offset-2 mt-2">
                  Back to home
                </router-link>
              </div>

              <template v-else-if="event">

                <div class="space-y-3">
                  <img
                    :src="logoUrl"
                    alt="Event logo"
                    class="w-20 h-20 rounded-2xl shadow-lg object-cover mx-auto mb-1"
                  />

                  <div v-if="event.status === 'pending'" class="flex justify-center">
                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-rose-red bg-rose-red/10 dark:bg-rose-red/15 px-3 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-rose-red"></span>
                      Pending final confirmation
                    </span>
                  </div>

                  <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl text-center">
                    {{ event.title }}
                  </h1>

                  <span class="block w-14 h-1 rounded-full bg-linear-to-r from-rose-red to-rose-green mx-auto"></span>

                  <div class="text-sm text-gray-600 dark:text-gray-400 space-y-0.5 text-center">
                    <div v-if="formattedDate">{{ formattedDate }}</div>
                    <div v-if="event.location">{{ event.location }}</div>
                  </div>
                  <p v-if="event.summary" class="text-sm text-gray-600 dark:text-gray-400 pt-2 text-center max-w-md mx-auto">
                    {{ event.summary }}
                  </p>
                </div>

                <Carousel :images="event.carouselImages" />

                <div v-if="event.sections?.length" class="space-y-10">
                  <template v-for="(section, index) in event.sections" :key="index">
                    <Divider v-if="index > 0" />

                    <section
                      class="flex flex-col gap-5"
                      :class="section.image ? 'md:flex-row md:items-center' : ''"
                    >
                      <div
                        v-if="section.image"
                        class="md:w-2/5 shrink-0"
                        :class="[
                          index % 2 === 1 ? 'md:order-2' : 'md:order-1',
                          section.hideImageOnMobile ? 'hidden md:block' : '',
                        ]"
                      >
                        <img
                          :src="urlForImage(section.image).width(500).height(500).fit('crop').url()"
                          :alt="section.heading || ''"
                          class="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                      <div
                        class="space-y-2"
                        :class="[section.image ? 'md:w-3/5' : '', section.image ? (index % 2 === 1 ? 'md:order-1' : 'md:order-2') : '']"
                      >
                        <h2 v-if="section.heading" class="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {{ section.heading }}
                        </h2>
                        <div class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                          <PortableText :value="section.body" />
                        </div>
                      </div>
                    </section>
                  </template>
                </div>

                <div v-if="event.registrationUrl" class="text-center pt-2 pb-8">
                  <Divider class="mb-8" />
                  <a
                    :href="event.registrationUrl"
                    target="_blank"
                    rel="noopener"
                    class="btn text-white bg-linear-to-r from-rose-red to-rose-red-dark hover:brightness-110 shadow-lg shadow-rose-red/20 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:opacity-20 before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1500"
                  >
                    Sign up now
                  </a>
                </div>

              </template>

            </main>

            <Footer />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
