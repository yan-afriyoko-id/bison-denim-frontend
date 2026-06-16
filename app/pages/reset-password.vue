<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-11 py-8 sm:py-12 md:py-16 flex-1">
        <div class="flex justify-center">
          <div class="w-full max-w-md">
            <!-- Reset Password Card -->
            <div class="bg-white border border-[#E6E9F0] rounded-lg shadow-sm p-6 sm:p-8">
              <!-- Valid Token State -->
              <div v-if="isTokenValid && !isResetting">
                <div class="text-center mb-6">
                  <h1 class="text-2xl sm:text-3xl font-semibold text-[#1A1919] mb-2">Reset Password</h1>
                  <p class="text-sm sm:text-base text-[#808080]">Masukkan password baru Anda di bawah</p>
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
                <form @submit.prevent="handleResetPassword" class="space-y-4 sm:space-y-5">
                  <!-- Password -->
                  <div>
                    <label for="password" class="block text-sm font-medium text-[#1A1919] mb-2">Password Baru</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        v-model="formData.password"
                        type="password"
                        id="password"
                        class="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                        placeholder="Masukkan password baru (min 8 karakter)"
                        required
                        minlength="8"
                        :disabled="isLoading"
                      />
                    </div>
                    <p class="text-xs text-[#808080] mt-1">Minimum 8 karakter</p>
                  </div>

                  <!-- Confirm Password -->
                  <div>
                    <label for="passwordConfirm" class="block text-sm font-medium text-[#1A1919] mb-2">Konfirmasi Password</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="w-5 h-5 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        v-model="formData.password_confirmation"
                        type="password"
                        id="passwordConfirm"
                        class="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                        placeholder="Konfirmasi password baru"
                        required
                        :disabled="isLoading"
                      />
                    </div>
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
                    <span>{{ isLoading ? 'Mereset Password...' : 'Reset Password' }}</span>
                  </button>

                  <!-- Back to Login Link -->
                  <div class="text-center pt-4 border-t border-[#E6E9F0]">
                    <p class="text-sm text-[#808080]">
                      <NuxtLink to="/login" class="text-[#E9322B] font-semibold hover:underline cursor-pointer">
                        Kembali ke login
                      </NuxtLink>
                    </p>
                  </div>
                </form>
              </div>

              <!-- Resetting State -->
              <div v-else-if="isResetting" class="py-5 text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9322B] mb-4"></div>
                <h5 class="text-xl font-semibold text-[#1A1919] mb-2">Mereset password Anda...</h5>
                <p class="text-sm text-[#808080]">Mohon tunggu sementara kami memperbarui password Anda</p>
              </div>

              <!-- Success State -->
              <div v-else-if="isSuccess" class="py-5 text-center">
                <div class="mb-4">
                  <svg class="w-16 h-16 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 class="text-xl font-semibold text-[#1A1919] mb-2">Password Berhasil Direset!</h5>
                <p class="text-sm text-[#808080] mb-4">Password Anda telah diperbarui. Mengalihkan ke halaman login...</p>
                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-sm text-green-800">
                    Mengalihkan dalam {{ redirectCountdown }} detik...
                  </p>
                </div>
              </div>

              <!-- Invalid Token State -->
              <div v-else-if="!isTokenValid" class="py-5 text-center">
                <div class="mb-4">
                  <svg class="w-16 h-16 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 class="text-xl font-semibold text-[#1A1919] mb-2">Link Reset Tidak Valid</h5>
                <p class="text-sm text-[#808080] mb-4">{{ errorMessage || 'Link reset password tidak valid atau telah kedaluwarsa.' }}</p>
                <div class="space-y-3">
                  <NuxtLink to="/forgot-password" class="block w-full bg-[#E9322B] text-white py-2.5 rounded-lg font-medium hover:bg-[#C4282B] transition text-center cursor-pointer">
                    Minta Link Reset Baru
                  </NuxtLink>
                  <NuxtLink to="/login" class="block w-full border border-[#E6E9F0] text-[#1A1919] py-2.5 rounded-lg font-medium hover:bg-[#F8F8F8] transition text-center cursor-pointer">
                    Kembali ke Login
                  </NuxtLink>
                </div>
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
import { useRoute, useRouter } from 'vue-router'
import { useAuthApi } from '~/composables/useAuthApi'

definePageMeta({
  middleware: 'guest'
})

useHead({
  title: "Reset Password - Karsindo",
})

const { resetPassword } = useAuthApi()
const { fetchPublicConfig } = useConfig()

// Router
const route = useRoute()
const router = useRouter()

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
const token = ref('')
const email = ref('')
const isTokenValid = ref(false)
const isLoading = ref(false)
const isResetting = ref(false)
const isSuccess = ref(false)
const redirectCountdown = ref(3)
const errorMessage = ref('')
const successMessage = ref('')

const formData = ref({
  password: '',
  password_confirmation: ''
})

// Clear errors
const clearErrors = () => {
  errorMessage.value = ''
}

// Handle reset password
const handleResetPassword = async () => {
  if (!formData.value.password || !formData.value.password_confirmation) {
    errorMessage.value = 'Harap isi semua field password'
    return
  }

  if (formData.value.password !== formData.value.password_confirmation) {
    errorMessage.value = 'Password tidak cocok'
    return
  }

  if (formData.value.password.length < 8) {
    errorMessage.value = 'Password harus minimal 8 karakter'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    console.log('Resetting password with token:', token.value, 'email:', email.value)
    
    const { data, error: apiError } = await resetPassword(
      token.value,
      email.value,
      formData.value.password,
      formData.value.password_confirmation
    )

    console.log('Reset password response:', data)

    if (apiError || !data?.success) {
      throw new Error(apiError?.message || data?.message || 'Gagal mereset password')
    }

    if (data.success) {
      isSuccess.value = true
      isLoading.value = false
      successMessage.value = 'Password berhasil direset! Mengalihkan ke halaman login...'

      // Auto redirect ke login dalam 3 detik
      const countdown = setInterval(() => {
        redirectCountdown.value--
        if (redirectCountdown.value <= 0) {
          clearInterval(countdown)
          router.push('/login')
        }
      }, 1000)
    }
  } catch (error) {
    console.error('Reset password error:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Gagal mereset password'
    isLoading.value = false
  }
}

// Validate token on mount
onMounted(() => {
  // Load logo
  loadLogo()
  
  // Validate token
  token.value = route.query.token as string
  email.value = route.query.email as string

  if (token.value && email.value) {
    isTokenValid.value = true
  } else {
    errorMessage.value = 'Token reset tidak valid atau tidak ditemukan'
    isTokenValid.value = false
  }
})
</script>
