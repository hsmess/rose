<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import TestimonialImg01 from '../images/testimonial-01.jpg'
import TestimonialImg02 from '../images/testimonial-02.jpg'
import TestimonialImg03 from '../images/testimonial-03.jpg'
import TestimonialImg04 from '../images/testimonial-04.jpg'

const items = [
  {
    name: 'Enrico Perry',
    role: 'CTO, medium.com',
    image: TestimonialImg01,
    link: "#0",
    content: "If there's one investment that's really paid off, it's hiring a professional developer. I love the results I get every day."
  },
  {
    name: 'Marta Lower',
    role: 'CTO, Vimeo',
    image: TestimonialImg02,
    link: "#0",
    content: "Thanks to Jordan, we were able to start our company in a matter of weeks. We have never been happier working with a freelancer."
  },
  {
    name: 'John Kusac',
    role: 'CEO, Mailchimp',
    image: TestimonialImg03,
    link: "#0",
    content: "If there's one investment that's really paid off, it's hiring a professional developer. I love the results I get every day."
  },
  {
    name: 'Lara Springfield',
    role: 'CTO, IndieHackers',
    image: TestimonialImg04,
    link: "#0",
    content: "Thanks to Jordan, we were able to start our company in a matter of weeks. We have never been happier working with a freelancer."
  },            
]

const container = ref(null)
const duration = 3000
const interval = ref(null)
const articleWidth = ref(null)
const gap = ref(null)

onMounted(() => {
  handleSizes()
  prependLastChild()
  removeTransitionTemporarily()
  translateContainer(-articleWidth.value - gap.value)
  playCarousel()
  setActiveState()
  window.addEventListener('resize', handleSizes)
  container.value.addEventListener('transitionend', handleTransitionEnd)
  container.value.addEventListener('mouseover', pauseCarousel);
  container.value.addEventListener('mouseout', playCarousel);
  container.value.addEventListener('focus', (event) => {
    if (event.currentTarget && !(event.currentTarget).contains(event.relatedTarget)) {
      pauseCarousel()
    }
  }, true)
  container.value.addEventListener('blur-sm', (event) => {
    if (event.currentTarget && !(event.currentTarget).contains(event.relatedTarget)) {
      playCarousel()
    }
  }, true)   
})

onBeforeUnmount(() => {
  pauseCarousel()
  window.removeEventListener('resize', handleSizes)
  container.value.removeEventListener('transitionend', handleTransitionEnd)
  container.value.removeEventListener('mouseover', pauseCarousel);
  container.value.removeEventListener('mouseout', playCarousel);
  container.value.removeEventListener('focus', (event) => {
    if (event.currentTarget && !(event.currentTarget).contains(event.relatedTarget)) {
      pauseCarousel()
    }
  }, true)
  container.value.removeEventListener('blur-sm', (event) => {
    if (event.currentTarget && !(event.currentTarget).contains(event.relatedTarget)) {
      playCarousel()
    }
  }, true)  
})

const handleSizes = () => {
  if(!container) return
  articleWidth.value = container.value.children[0].clientWidth
  gap.value = parseInt(window.getComputedStyle(container.value).gap)
}

const prependLastChild = () => {
  if(!container) return
  container.value.prepend(container.value.lastElementChild)
}

const translateContainer = (value) => { 
  if(!container) return
  container.value.style.transform = `translateX(${value}px)`
}

const removeTransitionTemporarily = () => {
  if(!container) return
  container.value.style.transition = 'none'
  setTimeout(() => {
    if(!container.value) return
    container.value.style.transition = ''
  }, 0)
}

const handleTransitionEnd = (event) => {
  if(!container) return
  if (event.propertyName !== 'transform') return 
  container.value.appendChild(container.value.firstElementChild)
  removeTransitionTemporarily()
  articleWidth && translateContainer(-articleWidth.value - gap.value)
  setActiveState()
}

const playCarousel = () => {
  interval.value = setInterval(() => {
    articleWidth.value && translateContainer(-2 * (articleWidth.value + gap.value))
  }, duration)
}

const pauseCarousel = () => {
  interval.value && clearInterval(interval.value)
}

const setActiveState = () => {
  if(!container) return
  Array.from(container.value.children).forEach((child, index) => {
    child.setAttribute('data-state', index === 1 ? 'active' : 'inactive')
  })
}
</script>

<template>
    <section>
      <h2 class="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Recommendations</h2>
      <div class="[mask-image:_linear-gradient(to_right,black_50%,transparent_90%)] md:[mask-image:_linear-gradient(to_right,transparent_48px,black_64px,black_50%,transparent_90%)] -mx-3 md:-mx-16">
        <div ref="container" class="flex gap-4 px-3 md:px-16 transition-transform duration-500 ease-in-out">
          <template v-for="item in items">
            <article class="shrink-0 w-[66.6667%] p-5 rounded-xl relative before:absolute before:inset-0 before:rounded-[inherit] before:-z-10 before:transition before:duration-300 data-[state=active]:before:bg-linear-to-tr data-[state=active]:before:from-gray-100 data-[state=active]:before:to-gray-50 dark:data-[state=active]:before:bg-linear-to-tr dark:data-[state=active]:before:from-gray-800 dark:data-[state=active]:before:to-gray-800/[0.65] before:opacity-0 data-[state=active]:before:opacity-100">
              <div class="flex items-center space-x-3 mb-4">
                <img class="shrink-0 w-11 h-11 rounded-full shadow-lg" :src="item.image" width="44" height="44" :alt="item.name" />
                <div>
                  <h3 class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-0.5">
                    <a class="hover:underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-2" :href="item.link">{{ item.name }}</a>
                  </h3>
                  <p class="text-[13px] font-medium text-gray-500/70">{{ item.role }}</p>
                </div>
              </div>
              <p class="font-inter-tight font-semibold text-gray-800 dark:text-gray-100 before:content-['\201C'] after:content-['\201D']">{{ item.content }}</p>
            </article>
          </template>
        </div>
      </div>
    </section>
</template>
