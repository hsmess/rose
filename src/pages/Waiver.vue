<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PortableText } from '@portabletext/vue'
import { sanityClient } from '../lib/sanity'
import ThemeToggle from '../partials/ThemeToggle.vue'
import Footer from '../partials/Footer.vue'
import roseLogo from '../images/rose-logo.webp'

const route = useRoute()

const waiver = ref(null)
const loading = ref(true)
const notFound = ref(false)
const loadError = ref(false)

const QUERY = `*[_type == "waiver" && slug.current == $slug][0]{
  title,
  updated,
  intro,
  sections[]{ heading, body }
}`

const loadWaiver = async (slug) => {
  loading.value = true
  notFound.value = false
  loadError.value = false
  waiver.value = null

  try {
    const result = await sanityClient.fetch(QUERY, { slug })
    if (!result) {
      notFound.value = true
    } else {
      waiver.value = result
    }
  } catch (err) {
    console.error('Failed to load waiver from Sanity:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => loadWaiver(route.params.slug))
watch(() => route.params.slug, (slug) => loadWaiver(slug))
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
                <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl">Couldn't load this waiver</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">Something went wrong fetching this page. Please try again shortly.</p>
              </div>

              <div v-else-if="notFound" class="text-center py-24 space-y-2">
                <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-2xl">Waiver not found</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">We couldn't find a waiver at this address.</p>
                <router-link to="/" class="inline-block text-sm text-gray-800 dark:text-gray-200 underline underline-offset-2 mt-2">
                  Back to home
                </router-link>
              </div>

              <template v-else-if="waiver">

                <div class="text-center space-y-3">
                  <router-link to="/">
                    <img class="mx-auto rounded-2xl" :src="roseLogo" width="96" height="96" alt="ROSE" />
                  </router-link>
                  <h1 class="font-inter-tight font-bold text-gray-800 dark:text-gray-100 text-3xl sm:text-4xl">
                    {{ waiver.title }}
                  </h1>
                  <p v-if="waiver.updated" class="text-xs text-gray-500 dark:text-gray-400">{{ waiver.updated }}</p>
                </div>

                <div v-if="waiver.intro?.length" class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                  <PortableText :value="waiver.intro" />
                </div>

                <section
                  v-for="(section, index) in waiver.sections || []"
                  :key="index"
                  class="border-t border-gray-200 dark:border-gray-700 pt-8"
                >
                  <h2 v-if="section.heading" class="font-inter-tight text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {{ section.heading }}
                  </h2>
                  <div class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                    <PortableText :value="section.body" />
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
