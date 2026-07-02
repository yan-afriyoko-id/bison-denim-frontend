<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 transition-all duration-300 group"
    :class="isScrolled || route.path !== '/' ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-white'"
  >
    <div
      class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px] flex items-center justify-between h-[75px]"
    >
      <!-- Left: Hamburger (mobile) + Logo + Text -->
      <div class="flex items-center gap-3">
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="xl:hidden flex items-center justify-center hover:cursor-pointer"
          :class="isWhiteHeader ? 'text-black' : 'text-white group-hover:text-black'"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>

        <NuxtLink
          to="/"
          class="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/assets/img/logo.png"
            alt="Bison Denim"
            class="block h-7 sm:h-9 w-auto object-contain select-none"
            draggable="false"
            ondragstart="return false"
          />
          <span
            class="text-base sm:text-lg font-semibold tracking-tight"
            :class="isWhiteHeader ? 'text-black' : 'text-white group-hover:text-black'"
          >Bison Denim</span>
        </NuxtLink>
      </div>

      <!-- Right: Search, Cart, Account/Profile -->
      <div class="flex items-center gap-3 ml-auto">
        <button
          @click="toggleSearch"
          class="hover:cursor-pointer"
          :class="isWhiteHeader ? 'text-black' : 'text-white group-hover:text-black'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
        </button>

        <button
          @click="togglePopupCart()"
          class="relative hover:cursor-pointer"
          :class="isWhiteHeader ? 'text-black' : 'text-white group-hover:text-black'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
          </svg>
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center"
          >
            {{ cartItemCount > 99 ? "99+" : cartItemCount }}
          </span>
        </button>

        <template v-if="!isAuthenticated">
          <NuxtLink
            to="/login"
            class="hidden sm:block hover:cursor-pointer"
            :class="isWhiteHeader ? 'text-black' : 'text-white group-hover:text-black'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
            </svg>
          </NuxtLink>
        </template>
        <NuxtLink
          v-else
          to="/account"
          class="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-semibold hover:cursor-pointer"
        >
          {{ userName.charAt(0).toUpperCase() }}
        </NuxtLink>
      </div>
    </div>

    <SearchPopup />

    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="xl:hidden fixed inset-0 bg-black/40 z-[60]"
    ></div>

    <!-- Mobile Sidebar -->
    <aside
      :class="[
        'xl:hidden fixed top-0 left-0 bottom-0 h-full w-[85%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <NuxtLink to="/" @click="isSidebarOpen = false" class="flex items-center gap-2">
            <img
              src="/assets/img/logo.png"
              alt="Bison Denim"
              class="block h-8 w-auto object-contain select-none"
              draggable="false"
              ondragstart="return false"
            />
            <span class="text-base font-semibold tracking-tight text-black">Bison Denim</span>
          </NuxtLink>
          <button @click="isSidebarOpen = false" class="p-2 hover:bg-gray-100 rounded transition cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
              <path d="M18 6L6 18M6 6L18 18"/>
            </svg>
          </button>
        </div>

        <div class="flex-1 flex flex-col gap-4 px-6 py-8">
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/login"
              @click="isSidebarOpen = false"
              class="w-full border border-black bg-white text-black px-5 py-3 rounded font-medium text-center text-base hover:bg-gray-50 transition"
            >
              Masuk
            </NuxtLink>
            <NuxtLink
              to="/register"
              @click="isSidebarOpen = false"
              class="w-full bg-black text-white px-5 py-3 rounded font-medium text-center text-base hover:bg-gray-800 transition cursor-pointer"
            >
              Daftar
            </NuxtLink>
          </template>
          <template v-else>
            <div class="px-4 py-3 border-b border-gray-200">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold text-sm">
                  {{ userName.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="text-sm font-semibold">{{ userName }}</p>
                  <p class="text-xs text-gray-500">{{ userEmail }}</p>
                </div>
              </div>
            </div>
            <NuxtLink
              to="/account"
              @click="isSidebarOpen = false"
              class="w-full px-5 py-3 rounded font-medium text-center text-base hover:bg-gray-50 transition"
            >
              Akun Saya
            </NuxtLink>
            <NuxtLink
              to="/account/orders"
              @click="isSidebarOpen = false"
              class="w-full px-5 py-3 rounded font-medium text-center text-base hover:bg-gray-50 transition"
            >
              Pesanan Saya
            </NuxtLink>
            <button
              @click="handleLogout"
              class="w-full px-5 py-3 rounded font-medium text-center text-base hover:bg-gray-50 transition cursor-pointer"
              :disabled="isLoggingOut"
            >
              {{ isLoggingOut ? 'Keluar...' : 'Keluar' }}
            </button>
          </template>
        </div>
      </div>
    </aside>

    <CartPopup />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { DEFAULT_APP_LOGO } from "~/composables/useAppIdentity"

const router = useRouter()
const route = useRoute()
const auth = useAuth()
const { appName, logoUrl, loadAppIdentity } = useAppIdentity()
const { logout } = auth
const { getCartItemCount, togglePopupCart, loadCart } = useCart()

const cartItemCount = getCartItemCount
const isSidebarOpen = ref(false)
const isLoggingOut = ref(false)
const isScrolled = ref(false)
const headerRef = ref<HTMLElement | null>(null)

const isWhiteHeader = computed(() => isScrolled.value || route.path !== '/')

const isAuthenticated = auth.isAuthenticated
const user = auth.user

const userName = computed(() => {
  if (!user.value) return "User"
  return (user.value.name || user.value.email?.split("@")[0] || "User").trim().slice(0, 10)
})

const userEmail = computed(() => user.value?.email || "")

const searchPopup = useState("search:showPopup", () => false)
const toggleSearch = () => {
  searchPopup.value = !searchPopup.value
}

const handleLogout = async () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  try {
    await logout()
    await router.push("/")
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    isLoggingOut.value = false
  }
}

// Scroll detection for header style switch
const handleScroll = () => {
  isScrolled.value = window.scrollY > (window.innerHeight * 0.6 + 40 - 75)
}

onMounted(async () => {
  if (!user.value) await auth.initAuth()
  await loadAppIdentity()
  await loadCart()
  window.addEventListener("scroll", handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>
