<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-11 py-8 sm:py-12 md:py-16 flex-1">
        <div class="flex justify-center">
          <div class="w-full max-w-md">
            <!-- Verification Card -->
            <div class="bg-white border border-[#E6E9F0] rounded-lg shadow-sm p-6 sm:p-8">
              <!-- Loading State -->
              <div v-if="isVerifying" class="py-5 text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9322B] mb-4"></div>
                <h5 class="text-xl font-semibold text-[#1A1919] mb-2">Memverifikasi email Anda...</h5>
                <p class="text-sm text-[#808080]">Mohon tunggu sementara kami memverifikasi alamat email Anda</p>
              </div>

              <!-- Success State -->
              <div v-else-if="isSuccess" class="py-5 text-center">
                <div class="mb-4">
                  <svg class="w-16 h-16 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 class="text-xl font-semibold text-[#1A1919] mb-2">Email Berhasil Diverifikasi!</h5>
                <p class="text-sm text-[#808080] mb-4">Email Anda telah diverifikasi. Mengalihkan ke homepage...</p>
                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-sm text-green-800">
                    Mengalihkan dalam {{ redirectCountdown }} detik...
                  </p>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="verificationError" class="py-5 text-center">
                <div class="mb-4">
                  <svg class="w-16 h-16 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 class="text-xl font-semibold text-[#1A1919] mb-2">Verifikasi Gagal</h5>
                <p class="text-sm text-[#808080] mb-4">{{ verificationError }}</p>
                <div class="space-y-3">
                  <NuxtLink :to="{ path: '/resend-verification', query: { email: emailRef } }" class="block w-full bg-[#E9322B] text-white py-2.5 rounded-lg font-medium hover:bg-[#C4282B] transition text-center cursor-pointer">
                    Kirim Ulang Email Verifikasi
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
import type { AuthUser } from '~/types/auth'
import { useRoute, useRouter } from 'vue-router'
import { useAuthApi } from '~/composables/useAuthApi'

definePageMeta({
  middleware: 'guest'
})

useHead({
  title: "Verifikasi Email",
})

// Router
const route = useRoute()
const router = useRouter()

// Auth state (using same pattern as useAuth composable)
const token = useCookie('auth_token')
const user = useState<AuthUser | null>('auth_user', () => null)

// API
const { verifyEmail } = useAuthApi()

// State
const isVerifying = ref(true)
const isSuccess = ref(false)
const verificationError = ref('')
const redirectCountdown = ref(3)
const emailRef = ref('')

// Verify email on mount
onMounted(async () => {
  const emailToken = route.query.token as string
  const email = route.query.email as string
  emailRef.value = email || ''

  if (!emailToken || !email) {
    verificationError.value = 'Link verifikasi tidak valid. Token atau email tidak ditemukan.'
    isVerifying.value = false
    return
  }

  try {
    // Call verify email API
    const { data, error: apiError } = await verifyEmail(emailToken, email)

    if (apiError || !data?.success) {
      throw new Error(apiError?.message || data?.message || 'Verifikasi email gagal')
    }

    if (data?.success && data?.data?.token && data?.data?.user) {
      // Save token and user (same pattern as useAuth)
      token.value = data.data.token
      user.value = data.data.user

      isSuccess.value = true
      isVerifying.value = false

      // Auto redirect ke homepage dalam 3 detik
      const countdown = setInterval(() => {
        redirectCountdown.value--
        if (redirectCountdown.value <= 0) {
          clearInterval(countdown)
          router.push('/')
        }
      }, 1000)
    } else {
      throw new Error('Respon tidak valid dari server')
    }
  } catch (error) {
    verificationError.value = error instanceof Error ? error.message : 'Verifikasi email gagal'
    isVerifying.value = false
  }
})
</script>
