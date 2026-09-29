<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { sanityClient, urlForImage } from '../lib/sanity'

const route = useRoute()

const page = ref(null)
const holes = ref([])
const loading = ref(true)
const loadError = ref(false)

const layout = computed(() => route.params.layout)
const hole = computed(() => Number(route.params.hole))
const otherLayout = computed(() => (layout.value === 'p' ? 'g' : 'p'))

const QUERY = `{
  "page": *[_type == "caddyPage" && layout == $layout && hole == $hole][0]{ image },
  "holes": *[_type == "caddyPage" && layout == $layout] | order(hole asc).hole,
  "otherHoles": *[_type == "caddyPage" && layout != $layout].hole
}`

const otherHoles = ref([])

const load = async () => {
  loading.value = true
  loadError.value = false
  page.value = null
  try {
    const result = await sanityClient.fetch(QUERY, { layout: layout.value, hole: hole.value })
    page.value = result.page
    holes.value = result.holes
    otherHoles.value = result.otherHoles
  } catch (err) {
    console.error('Failed to load caddy book page from Sanity:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => [route.params.layout, route.params.hole], load)

const imageUrl = computed(() =>
  page.value?.image ? urlForImage(page.value.image).width(1200).auto('format').url() : null
)

const prevHole = computed(() => (holes.value.includes(hole.value - 1) ? hole.value - 1 : null))
const nextHole = computed(() => (holes.value.includes(hole.value + 1) ? hole.value + 1 : null))
const hasOther = computed(() => otherHoles.value.includes(hole.value))

const href = (l, h) => `/live-caddy-book/${l}/h${h}`
</script>

<template>
  <div class="min-h-screen bg-rose-cream text-rose-green-dark">
    <div class="max-w-[560px] mx-auto px-3 py-4 flex flex-col items-center gap-4">

      <p v-if="loading" class="text-sm py-24">Loading…</p>

      <p v-else-if="loadError" class="text-sm py-24 text-center">
        Couldn't load this page. Please check your signal and try again.
      </p>

      <p v-else-if="!imageUrl" class="text-sm py-24 text-center">
        We couldn't find this hole. Head back to the
        <router-link to="/" class="underline underline-offset-2">ROSE home page</router-link>.
      </p>

      <template v-else>
        <img
          :src="imageUrl"
          :alt="`Hole ${hole}`"
          class="w-full h-auto rounded-lg shadow-md"
        />

        <nav class="w-full flex items-center justify-between text-sm font-semibold">
          <router-link v-if="prevHole" :to="href(layout, prevHole)" class="py-2 pr-4">← Hole {{ prevHole }}</router-link>
          <span v-else class="py-2 pr-4 opacity-0">←</span>

          <router-link v-if="hasOther" :to="href(otherLayout, hole)" class="py-2 px-4 underline underline-offset-2">
            Other layout
          </router-link>

          <router-link v-if="nextHole" :to="href(layout, nextHole)" class="py-2 pl-4">Hole {{ nextHole }} →</router-link>
          <span v-else class="py-2 pl-4 opacity-0">→</span>
        </nav>
      </template>

    </div>
  </div>
</template>
