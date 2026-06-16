<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-11 py-8 sm:py-12 md:py-16 flex-1">
        <div class="flex justify-center">
          <div class="w-full max-w-md">
            <!-- Resend Card -->
            <div class="bg-white border border-[#E6E9F0] rounded-lg shadow-sm p-6 sm:p-8">
              <div class="text-center mb-6">
                <h1 class="text-2xl sm:text-3xl font-semibold text-[#1A1919] mb-2">Kirim Ulang Email Verifikasi</h1>
                <p class="text-sm sm:text-base text-[#808080]">Masukkan email Anda untuk menerima link verifikasi</p>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-green-800 flex-1">{{ successMessage }}</p>
                <button @click="successMessage = ''" class="text-green-600 hover:text-green-800 cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-red-800 flex-1">{{ errorMessage }}</p>
                <button @click="clearErrors" class="text-red-600 hover:text-red-800 cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Email Display and Resend Button -->
              <div class="space-y-4 sm:space-y-5">
                <div>
                  <label class="block text-sm font-medium text-[#1A1919] mb-2">Email</label>
                  <div class="p-3 border border-[#E6E9F0] rounded-lg bg-[#F8F8F8] flex items-center gap-2">
                    <svg class="w-5 h-5 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm text-[#1A1919]">{{ email || 'Email tidak terdeteksi' }}</span>
                  </div>
                </div>

                <button
                  type="button"
                  class="w-full bg-[#E9322B] text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#C4282B] transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  :disabled="isLoading || !email"
                  @click="handleResend"
                >
                  <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isLoading ? 'Mengirim...' : 'Kirim Email Verifikasi' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthApi } from '~/composables/useAuthApi'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: 'guest'
})

useHead({
  title: "Kirim Ulang Email Verifikasi - Karsindo",
})

// Auth composable
const { user } = useAuth()
const { resendVerificationEmail } = useAuthApi()

// State
const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Pre-fill email from query param, logged-in user, or remembered email
onMounted(() => {
  const route = useRoute()
  if (route.query.email) {
    email.value = route.query.email as string
  } else if (user.value?.email) {
    email.value = user.value.email
  } else if (process.client) {
    const remembered = localStorage.getItem('remembered_email')
    if (remembered) email.value = remembered
  }
})

// Clear errors
const clearErrors = () => {
  errorMessage.value = ''
}

// Handle resend
const handleResend = async () => {
  if (!email.value) {
    errorMessage.value = 'Email tidak ditemukan. Silakan kembali ke Login.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const { data, error: apiError } = await resendVerificationEmail(email.value)

    if (apiError || !data?.success) {
      throw new Error(apiError?.message || data?.message || 'Gagal mengirim email verifikasi')
    }

    successMessage.value = 'Email verifikasi telah dikirim! Silakan cek inbox email Anda.'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Gagal mengirim email verifikasi'
  } finally {
    isLoading.value = false
  }
}
</script>
