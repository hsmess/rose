<script setup>
const items = [
  {
    title: 'ROSE Gilly\'s',
    link: "#0",
    icon: 'https://aardvark-cdn.s3.eu-west-2.amazonaws.com/calendar-jan-10.svg',
    date: 'January 10th 2026, 10am',
    location: 'Stratford-upon-Avon, CV37 0JA',
    description: 'Starting the series at one of Harry\'s favourite places to play in England, this one-day, 2 round PDGA C-tier will be the ROSE Kickoff event. A perfect first tournament, fun in the woods for all!'
  },
  {
    title: 'ROSE Cannock',
    link: "#0",
    date: 'January 24th 2026, 10am*',
    icon: 'https://aardvark-cdn.s3.eu-west-2.amazonaws.com/calendar-jan-24.svg',
    location: 'Cannock Chase, WS12 4PW',
    description: 'The first ever PDGA sanctioned disc golf tournament at a Forestry England property, this tournament will be 4 loops of 9 holes (marked as 2x18 in PDGA) making the maximum players 36 in total!'
  },
  {
    title: 'ROSE Cotswolds',
    link: "#0",
    date: 'February 7th 2026, 10:30am',
    icon: 'https://aardvark-cdn.s3.eu-west-2.amazonaws.com/calendar-feb-07.svg',
    location: 'Charlbury, OX7 3JH',
    description: 'Returning to a classic UK course, Harry has run many successful events at Cotswold View. This event will act as a Warm Up event for the Cotswold Cup, with £2/pp discount for Cotswold Cup players and a first place prize of a Cotswold Cup place for the best scoring Mixed and Female players.'
  },
  {
    title: 'ROSE Delemere',
    link: "#0",
    date: 'February 21st 2026, 10:30am*',
    icon: 'https://aardvark-cdn.s3.eu-west-2.amazonaws.com/calendar-feb-21.svg',
    location: 'Cheshire, WA6 6NB',
    description: 'Another tournament first, the 9-hole layout at Delemere is slightly tricky and at an absolutely beautiful forest park. This would make an excellent first wooded event for those in the North of England, or a really fun challenge for any competitive player!'
  },
  {
    title: 'ROSE Cricklade',
    link: "#0",
    date: 'March 7th 2026, 10:30am',
    icon: 'https://aardvark-cdn.s3.eu-west-2.amazonaws.com/calendar-mar-07.svg',
    location: 'Cricklade, SN6 6JA',
    description: 'With beautiful on-site accommodation and playing around the grounds of a lovely hotel, this is the perfect location for the final one-day event. Come hang out, eat pizza and play a stunning course. Not to be missed!'
  }
]
</script>

<template>
  <section>
    <h2 class="font-inter-tight text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Events</h2>
    <div class="space-y-1">
      <template v-for="item in items">
        <article
          class="p-5 rounded-xl odd:bg-linear-to-tr odd:from-gray-100 odd:to-gray-50 dark:odd:bg-linear-to-tr dark:odd:from-gray-800 dark:odd:to-gray-800/[0.65]">
          <div class="sm:flex gap-5">
            <img :src="item.icon" alt="icon" class="shadow-xs max-sm:mb-3 sm:mt-5 w-12 h-12 flex items-center justify-center">
            <div>
              <div class="space-y-1.5 mb-3">
                <div class="text-[13px] italic text-gray-500/70">{{ item.date }}</div>
                <h3 class="font-semibold text-gray-800 dark:text-gray-100">
                  <a class="hover:underline decoration-2 decoration-gray-300 dark:decoration-gray-600 underline-offset-2"
                    :href="item.link">{{ item.title }}</a>
                </h3>
                <div class="text-[13px] font-medium text-gray-600dark:text-gray-400">{{ item.location }}</div>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
            </div>
          </div>
        </article>
      </template>
      <p class="text-xs font-medium text-gray-400">Please note: Forestry England events are pending final confirmation</p>

      <div class="pt-2 pb-2">
        Flex Start Events
        <div class="text-[13px] pt-2 italic text-gray-500/70">Please stay tuned for news of Flex Start Events. There will likely be at least two, cost £10 to enter, one round with a group of your choosing</div>
      </div>
    </div>
  </section>
</template>
