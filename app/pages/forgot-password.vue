<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-11 py-8 sm:py-12 md:py-16 flex-1">
        <div class="flex justify-center">
          <div class="w-full max-w-md">
            <!-- Forgot Password Card -->
            <div class="bg-white border border-[#E6E9F0] rounded-lg shadow-sm p-6 sm:p-8">
              <div class="text-center mb-6">
                <h1 class="text-2xl sm:text-3xl font-semibold text-[#1A1919] mb-2">Lupa Password?</h1>
                <p class="text-sm sm:text-base text-[#808080]">Masukkan email Anda untuk menerima link reset password</p>
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

              <!-- Form -->
              <form @submit.prevent="handleForgotPassword" class="space-y-4 sm:space-y-5">
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-[#1A1919] mb-2">Email</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      class="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="your@email.com"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                  <p class="text-xs text-[#808080] mt-1">Kami akan mengirimkan link reset password ke email Anda</p>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full bg-[#E9322B] text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#C4282B] transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  :disabled="isLoading"
                >
                  <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{{ isLoading ? 'Mengirim...' : 'Kirim Link Reset Password' }}</span>
                </button>

                <!-- Back to Login Link -->
                <div class="text-center pt-4 border-t border-[#E6E9F0]">
                  <p class="text-sm text-[#808080]">
                    Ingat password Anda?
                    <NuxtLink to="/login" class="text-[#E9322B] font-semibold hover:underline cursor-pointer">
                      Kembali ke login
                    </NuxtLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useAuthApi } from '~/composables/useAuthApi'

definePageMeta({
  middleware: 'guest'
})

useHead({
  title: "Lupa Password",
})

const { forgotPassword } = useAuthApi()
const { fetchPublicConfig } = useConfig()

// Logo state
const logoUrl = ref<string | null>(null)

const handleLogoError = () => {
  logoUrl.value = '/assets/img/logo.png'
}

const loadLogo = async () => {
  try {
    const response = await fetchPublicConfig('store_logo_website')
    if (!response) return
    
    // Response structure: { success, data: Config }
    const configData = response?.data
    if (configData) {
      if (configData.value_image) {
        logoUrl.value = configData.value_image
      } else if (configData.value && typeof configData.value === 'string') {
        // Fallback to value if value_image is not available
        logoUrl.value = configData.value
      }
    }
  } catch (error) {
    console.error('Failed to load logo:', error)
  }
}

// State
const email = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Load logo on mount
onMounted(() => {
  loadLogo()
})

// Clear errors
const clearErrors = () => {
  errorMessage.value = ''
}

// Handle forgot password
const handleForgotPassword = async () => {
  if (!email.value) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const { data, error: apiError } = await forgotPassword(email.value)

    if (apiError || !data?.success) {
      throw new Error(apiError?.message || data?.message || 'Gagal mengirim link reset password')
    }

    successMessage.value = 'Link reset password telah dikirim! Silakan cek inbox email Anda.'
    email.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Gagal mengirim link reset password'
  } finally {
    isLoading.value = false
  }
}
</script>
