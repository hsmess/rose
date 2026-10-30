<script setup>
import { ref } from 'vue'

// Mailchimp embedded form (Audience > Signup forms > Embedded forms). These values are public by design.
const MAILCHIMP_ACTION =
  'https://rosediscgolf.us8.list-manage.com/subscribe/post?u=47ce1a8c046d1cfd107c78fea&id=9dea37cb79&f_id=00f2c8e1f0'
// Honeypot field Mailchimp uses to reject bot signups: b_{u}_{id}
const MAILCHIMP_BOT_FIELD = 'b_47ce1a8c046d1cfd107c78fea_9dea37cb79'

const email = ref('')
const firstName = ref('')
const lastName = ref('')
const consentGiven = ref(false)
const showConsentError = ref(false)
const status = ref('idle') // idle | submitting | success | error
const message = ref('')

// Mailchimp's JSONP endpoint lets us submit in-page (a plain cross-origin fetch is blocked by CORS).
const subscribe = () =>
  new Promise((resolve, reject) => {
    const callback = `mcCallback${Date.now()}`
    const params = new URLSearchParams(new URL(MAILCHIMP_ACTION).search)
    params.delete('f_id')
    params.set('EMAIL', email.value)
    params.set('FNAME', firstName.value.trim())
    params.set('LNAME', lastName.value.trim())
    params.set(MAILCHIMP_BOT_FIELD, '')
    params.set('c', callback)

    const script = document.createElement('script')
    const cleanup = () => {
      clearTimeout(timer)
      delete window[callback]
      script.remove()
    }
    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('timeout'))
    }, 15000)
    window[callback] = (data) => {
      cleanup()
      resolve(data)
    }
    script.onerror = () => {
      cleanup()
      reject(new Error('network'))
    }
    script.src = `${MAILCHIMP_ACTION.split('?')[0].replace('/post', '/post-json')}?${params}`
    document.body.appendChild(script)
  })

// Mailchimp messages can contain HTML and a leading "0 - " field index
const cleanMessage = (msg) =>
  String(msg || '').replace(/<[^>]*>/g, '').replace(/^\d+\s*-\s*/, '').trim()

const handleSubmit = async () => {
  if (status.value === 'submitting') return
  if (!consentGiven.value) {
    showConsentError.value = true
    return
  }
  status.value = 'submitting'
  message.value = ''
  try {
    const data = await subscribe()
    if (data.result === 'success') {
      status.value = 'success'
      message.value = cleanMessage(data.msg) || "Thanks! Check your inbox to confirm your email address."
    } else {
      status.value = 'error'
      message.value = cleanMessage(data.msg) || 'Something went wrong. Please try again.'
    }
  } catch {
    status.value = 'error'
    message.value = "Couldn't reach the signup service. Please try again shortly."
  }
}
</script>

<template>
  <div class="w-full">
                <form v-if="status !== 'success'" @submit.prevent="handleSubmit">
                  <div class="grid grid-cols-2 gap-2 mb-2">
                    <input
                      v-model="firstName" type="text" name="FNAME" id="mce-FNAME" autocomplete="given-name"
                      aria-label="First name (optional)" placeholder="First name (optional)"
                      class="w-full text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-200 dark:focus:border-gray-700 focus:outline-hidden p-2.5" />
                    <input
                      v-model="lastName" type="text" name="LNAME" id="mce-LNAME" autocomplete="family-name"
                      aria-label="Last name (optional)" placeholder="Last name (optional)"
                      class="w-full text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-200 dark:focus:border-gray-700 focus:outline-hidden p-2.5" />
                  </div>

                  <div class="flex bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus-within:ring-2 ring-gray-300 dark:ring-gray-600">
                    <input
                      class="flex-1 text-sm bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 border-none focus:ring-0 focus:outline-hidden"
                      v-model="email" type="email" name="EMAIL" id="mce-EMAIL" required
                      aria-label="Enter your email to be notified about ROSE 2027"
                      placeholder="Enter your email..." autocomplete="off" />
                    <button
                      type="submit"
                      :disabled="status === 'submitting'"
                      class="disabled:opacity-60 btn-sm text-white dark:text-gray-900 bg-gray-800 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-white">
                      {{ status === 'submitting' ? 'Sending…' : 'Notify me' }}
                    </button>
                  </div>

                  <label class="flex items-start gap-2 mt-4 text-left text-xs text-gray-500 dark:text-gray-400">
                    <input
                      type="checkbox"
                      v-model="consentGiven"
                      class="mt-0.5 rounded bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-500 checked:bg-rose-red dark:checked:bg-rose-red checked:border-rose-red dark:checked:border-rose-red focus:ring-gray-400 dark:focus:ring-gray-500"
                      @change="showConsentError = false"
                    />
                    <span>I agree to receive email updates about ROSE events. You can unsubscribe at any time using the link in every email.</span>
                  </label>
                  <p v-if="showConsentError" class="mt-2 text-xs text-red-400 text-left">
                    Please tick the box to confirm you're happy to receive emails from us.
                  </p>
                  <p v-if="status === 'error'" role="alert" class="mt-2 text-xs text-red-400 text-left">
                    {{ message }}
                  </p>
                </form>

                <p v-else role="status" class="text-sm text-gray-800 dark:text-gray-100 font-medium">
                  {{ message }}
                </p>
  </div>
</template>
