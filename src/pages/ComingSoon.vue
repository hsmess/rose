<script setup>
import { ref, onMounted } from 'vue'
import ThemeToggle from '../partials/ThemeToggle.vue'
import Footer from '../partials/Footer.vue'
import { sanityClient } from '../lib/sanity'

// TODO: replace with the real Buttondown username before launch
const BUTTONDOWN_USERNAME = 'ratatoskr'

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

const consentGiven = ref(false)
const showConsentError = ref(false)

const handleSubmit = (e) => {
  if (!consentGiven.value) {
    e.preventDefault()
    showConsentError.value = true
    return
  }
  window.open(`https://buttondown.com/${BUTTONDOWN_USERNAME}`, 'popupwindow')
}
</script>

<template>
  <div class="overflow-hidden supports-[overflow:clip]:overflow-clip">
    <div class="max-w-[728px] mx-auto">
      <div class="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
        <div class="px-3 md:px-16">
          <div class="flex flex-col min-h-screen">

            <header class="text-center pt-6 grow flex flex-col justify-center">

              <ThemeToggle />

              <img class="inline-flex rounded-2xl shadow-lg mb-8 mx-auto" src="https://aardvark-cdn.s3.eu-west-2.amazonaws.com/RO+SE.png" width="150" height="150" alt="ROSE" />

              <h1 class="font-inter-tight font-black text-gray-800 dark:text-gray-100 text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6">
                {{ title }}<br />{{ subtitle }}
              </h1>

              <p class="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-2">
                {{ description }}
              </p>

              <div class="mt-8 mb-4 max-w-sm mx-auto w-full">
                <form
                  :action="`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`"
                  method="post"
                  target="popupwindow"
                  class="embeddable-buttondown-form"
                  @submit="handleSubmit"
                >
                  <div class="flex bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus-within:ring-2 ring-gray-300 dark:ring-gray-600">
                    <input
                      class="flex-1 text-sm bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 border-none focus:ring-0 focus:outline-hidden"
                      type="email" name="email" id="bd-email" required
                      aria-label="Enter your email to be notified about ROSE 2027"
                      placeholder="Enter your email..." autocomplete="off" />
                    <input type="hidden" value="1" name="embed" />
                    <button
                      type="submit"
                      class="btn-sm text-gray-200 dark:text-gray-800 bg-linear-to-r from-gray-800 to-gray-700 dark:from-gray-300 dark:to-gray-100 dark:hover:bg-gray-100 shadow-xs relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:opacity-20 dark:before:opacity-100 dark:before:bg-linear-[45deg,transparent_25%,var(--color-white)_50%,transparent_75%,transparent_100%] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-1500">
                      Notify me
                    </button>
                  </div>

                  <label class="flex items-start gap-2 mt-4 text-left text-xs text-gray-500 dark:text-gray-400">
                    <input
                      type="checkbox"
                      v-model="consentGiven"
                      class="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-gray-400"
                      @change="showConsentError = false"
                    />
                    <span>I agree to receive email updates about ROSE events. You can unsubscribe at any time using the link in every email.</span>
                  </label>
                  <p v-if="showConsentError" class="mt-2 text-xs text-red-400 text-left">
                    Please tick the box to confirm you're happy to receive emails from us.
                  </p>
                </form>
              </div>

            </header>

            <Footer />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
