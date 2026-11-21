<script setup>
import { computed } from 'vue'

// Weekend-only calendar: one block per month, one row per weekend (Sat | Sun).
// Event links go to /events/:slug. Events on a weekday show under their week's row.
const props = defineProps({
  events: { type: Array, default: () => [] },
  // Skip months that have already finished (used on the home page)
  hidePast: { type: Boolean, default: false },
})

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Calendar day in UK time (event datetimes are stored as UTC instants)
const dayFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/London',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
const parseDay = (iso) => {
  const [y, m, d] = dayFormat.format(new Date(iso)).split('-').map(Number)
  return { y, m: m - 1, d }
}

const items = computed(() =>
  (props.events || [])
    .filter((e) => e?.date && e?.slug)
    .map((e) => ({
      slug: e.slug,
      label: e.calendarLabel || e.title,
      pending: e.status === 'pending',
      ...parseDay(e.date),
    }))
)

// Runs of this many (or more) weekends with no events collapse into a single "No events" line
const COLLAPSE_AFTER = 3

const isEmptyRow = (r) => !r.sat?.events.length && !r.sun?.events.length && !r.extra.length

const collapseEmptyRuns = (rows, monthName) => {
  const items = []
  let i = 0
  while (i < rows.length) {
    if (!isEmptyRow(rows[i])) {
      items.push({ type: 'row', key: rows[i].monday, row: rows[i] })
      i++
      continue
    }
    let j = i
    while (j < rows.length && isEmptyRow(rows[j])) j++
    if (j - i >= COLLAPSE_AFTER) {
      const from = rows[i].sat?.day ?? rows[i].sun.day
      const to = rows[j - 1].sun?.day ?? rows[j - 1].sat.day
      items.push({ type: 'gap', key: `gap-${rows[i].monday}`, label: `No events ${from} – ${to} ${monthName}` })
    } else {
      for (let k = i; k < j; k++) items.push({ type: 'row', key: rows[k].monday, row: rows[k] })
    }
    i = j
  }
  return items
}

const months = computed(() => {
  if (!items.value.length) return []
  const keys = items.value.map((e) => e.y * 12 + e.m)
  const last = Math.max(...keys)
  const today = parseDay(new Date().toISOString())
  const first = props.hidePast ? Math.min(Math.max(Math.min(...keys), today.y * 12 + today.m), last) : Math.min(...keys)

  const result = []
  for (let key = first; key <= last; key++) {
    const y = Math.floor(key / 12)
    const m = key % 12
    const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
    const monthItems = items.value.filter((e) => e.y === y && e.m === m)
    const rows = new Map() // keyed by the Monday of each week (may be <= 0 for the first week)

    const rowFor = (day) => {
      const dow = new Date(Date.UTC(y, m, day)).getUTCDay() // 0 Sun .. 6 Sat
      const monday = day - ((dow + 6) % 7)
      if (!rows.has(monday)) rows.set(monday, { monday, sat: null, sun: null, extra: [] })
      return { row: rows.get(monday), dow }
    }
    const eventsOn = (day) => monthItems.filter((e) => e.d === day)

    for (let day = 1; day <= daysInMonth; day++) {
      const { row, dow } = rowFor(day)
      if (dow === 6) row.sat = { day, events: eventsOn(day) }
      else if (dow === 0) row.sun = { day, events: eventsOn(day) }
      else row.extra.push(...eventsOn(day).map((e) => ({ ...e, day, dow })))
    }

    const monthRows = [...rows.values()]
      .filter((r) => r.sat || r.sun || r.extra.length)
      .sort((a, b) => a.monday - b.monday)

    result.push({
      key,
      name: `${MONTH_NAMES[m]} ${y}`,
      items: collapseEmptyRuns(monthRows, MONTH_NAMES[m]),
    })
  }
  return result
})

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
</script>

<template>
  <div v-if="months.length" class="grid gap-x-6 gap-y-6 sm:grid-cols-2">
    <section v-for="month in months" :key="month.key">
      <h3 class="font-inter-tight font-semibold text-gray-800 dark:text-gray-100 mb-2">{{ month.name }}</h3>
      <table class="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <th scope="col" class="w-1/2 py-1 text-left font-medium">Saturday</th>
            <th scope="col" class="w-1/2 py-1 text-left font-medium">Sunday</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in month.items" :key="item.key">
            <tr v-if="item.type === 'gap'">
              <td colspan="2" class="border border-dashed border-gray-200 dark:border-gray-700 py-2 text-center text-xs italic text-gray-400 dark:text-gray-500">
                {{ item.label }}
              </td>
            </tr>
            <template v-else>
              <tr>
                <td
                  v-for="(cell, i) in [item.row.sat, item.row.sun]"
                  :key="i"
                  class="align-top border border-gray-200 dark:border-gray-700 p-2 h-14"
                  :class="cell?.events.length ? 'bg-rose-red/10 dark:bg-rose-red/20' : ''"
                >
                  <template v-if="cell">
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ cell.day }}</div>
                    <router-link
                      v-for="event in cell.events"
                      :key="event.slug"
                      :to="`/events/${event.slug}`"
                      class="block font-semibold leading-snug text-rose-red-dark dark:text-rose-red hover:underline underline-offset-2"
                    >
                      {{ event.label }}<span v-if="event.pending" class="font-normal text-xs"> (TBC)</span>
                    </router-link>
                  </template>
                </td>
              </tr>
              <tr v-if="item.row.extra.length">
                <td colspan="2" class="border border-t-0 border-gray-200 dark:border-gray-700 px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
                  <router-link
                    v-for="event in item.row.extra"
                    :key="event.slug"
                    :to="`/events/${event.slug}`"
                    class="font-semibold text-rose-red-dark dark:text-rose-red hover:underline underline-offset-2 mr-3"
                  >
                    {{ DOW[event.dow] }} {{ event.day }}: {{ event.label }}
                  </router-link>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </section>
  </div>
  <p v-else class="text-sm text-gray-500 dark:text-gray-400">Dates coming soon.</p>
</template>
