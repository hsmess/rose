<script setup>
import { ref } from 'vue'
import Header from '../partials/Header.vue'
import Experience from '../partials/Experience.vue'
import Tutorials from '../partials/Tutorials.vue'
import Articles from '../partials/Articles.vue'
import Footer from '../partials/Footer.vue'
import SideHustles from '../partials/SideHustles.vue'
import Recommendations from '../partials/Recommendations.vue'
import Newsletter from '../partials/Newsletter.vue'
import Countdown from '../partials/Countdown.vue'

const showContent = ref(true)

const handleCountdownFinished = () => {
  showContent.value = true
}
</script>

<template>
  <div class="overflow-hidden supports-[overflow:clip]:overflow-clip">
    <div class="max-w-[728px] mx-auto">
      <div class="w-full bg-white dark:bg-gray-900 border-x border-gray-100 dark:border-gray-800 box-content">
        <div class="px-3 md:px-16">
          <div class="flex flex-col min-h-screen">

            <!-- Countdown Screen -->
            <Countdown v-if="!showContent" @countdown-finished="handleCountdownFinished" />

            <!-- Main Content (hidden until countdown finishes) -->
            <template v-else>
              <Header />

              <main class="grow py-12 space-y-12">
                <Tutorials />
                <Experience />

<!--                <Articles />-->
                <SideHustles />
<!--                <Recommendations />-->
<!--                <Newsletter />-->
              </main>

              <Footer />
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
