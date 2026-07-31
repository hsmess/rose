<script setup>
import { ref, watch } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { urlForImage } from '../lib/sanity'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
})

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: props.images.length > 1 })

const selectedIndex = ref(0)

watch(emblaApi, (api) => {
  if (!api) return
  const onSelect = () => {
    selectedIndex.value = api.selectedScrollSnap()
  }
  onSelect()
  api.on('select', onSelect)
  api.on('reInit', onSelect)
})

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()
const scrollTo = (index) => emblaApi.value?.scrollTo(index)
</script>

<template>
  <div v-if="images.length" class="relative">
    <div class="overflow-hidden rounded-xl shadow-lg" ref="emblaRef">
      <div class="flex">
        <div
          v-for="(image, index) in images"
          :key="image._key || index"
          class="flex-[0_0_100%] min-w-0"
        >
          <img
            :src="urlForImage(image).width(1200).height(700).fit('crop').url()"
            :alt="image.alt || ''"
            class="w-full h-[260px] sm:h-[360px] object-cover"
          />
        </div>
      </div>
    </div>

    <template v-if="images.length > 1">
      <button
        type="button"
        aria-label="Previous image"
        class="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 shadow-xs"
        @click="scrollPrev"
      >
        &#8592;
      </button>
      <button
        type="button"
        aria-label="Next image"
        class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 shadow-xs"
        @click="scrollNext"
      >
        &#8594;
      </button>

      <div class="flex items-center justify-center gap-1.5 mt-3">
        <button
          v-for="(image, index) in images"
          :key="image._key || index"
          type="button"
          :aria-label="`Go to image ${index + 1}`"
          class="rounded-full transition-all"
          :class="index === selectedIndex ? 'w-4 h-1.5 bg-rose-red' : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600'"
          @click="scrollTo(index)"
        />
      </div>
    </template>
  </div>
</template>
