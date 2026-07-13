<template>
  <header
    ref="headerRef"
    class="sticky top-0 z-50 transition-all duration-300 group"
    :class="(isWhiteHeader || isSidebarOpen) ? 'bg-white shadow-sm' : 'bg-transparent'"
  >
    <AnnouncementBar />
    <div
      class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px] flex items-center justify-between h-[75px]"
    >
      <!-- Left: Hamburger (mobile) + Logo + Text -->
      <div class="flex items-center gap-3">
        <button
          @click="toggleSidebar"
          class="flex h-10 w-10 items-center justify-center rounded-full transition hover:cursor-pointer hover:bg-black/5"
          :class="isWhiteHeader || isSidebarOpen ? 'text-black' : 'text-white'"
          :aria-expanded="isSidebarOpen"
          aria-label="Open navigation menu"
        >
          <svg
            v-if="!isSidebarOpen"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round" />
          </svg>
          <svg
            v-else
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
          >
            <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
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
            :class="isWhiteHeader ? 'text-black' : 'text-white'"
          >Bison Denim</span>
        </NuxtLink>
      </div>

      <!-- Right: Search, Cart, Account/Profile -->
      <div class="flex items-center gap-3 ml-auto">
        <button
          @click="toggleSearch"
          class="hover:cursor-pointer"
          :class="isWhiteHeader ? 'text-black' : 'text-white'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
        </button>

        <button
          @click="togglePopupCart()"
          class="relative hover:cursor-pointer"
          :class="isWhiteHeader ? 'text-black' : 'text-white'"
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

        <template v-if="!isHydrated">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full opacity-0 flex-none" aria-hidden="true">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none"></svg>
          </span>
        </template>
        <template v-else-if="!isAuthenticated">
          <NuxtLink
            to="/login"
            class="hover:cursor-pointer"
            :class="isWhiteHeader ? 'text-black' : 'text-white'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
            </svg>
          </NuxtLink>
        </template>
        <NuxtLink
          v-else
          to="/account"
          class="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold hover:cursor-pointer transition-colors flex-none"
          :class="route.path.startsWith('/account')
            ? 'bg-black text-white ring-1 ring-black/10'
            : isWhiteHeader
              ? 'bg-black text-white ring-1 ring-black/10'
              : 'bg-white text-black ring-1 ring-black/10'"
        >
          {{ userName.charAt(0).toUpperCase() }}
        </NuxtLink>
      </div>
    </div>

    <SearchPopup />

    <div
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[1px]"
    ></div>

    <aside
      :class="[
        'fixed inset-y-0 left-0 z-[90] h-screen w-[100vw] max-w-[420px] overflow-y-auto bg-white transform-gpu transition-transform duration-300 ease-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      aria-label="Primary navigation"
    >
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4 md:px-8 md:py-6">
          <NuxtLink to="/" @click="closeSidebar" class="flex items-center gap-3">
            <img
              src="/assets/img/logo.png"
              alt="Bison Denim"
              class="block h-8 w-auto object-contain select-none"
              draggable="false"
              ondragstart="return false"
            />
            <span class="text-sm lg:text-lg font-semibold tracking-tight text-black">Bison Denim</span>
          </NuxtLink>
          <button
            type="button"
            @click="closeSidebar"
            class="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-black/5"
            aria-label="Close navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div class="grid gap-5">
            <div>
              <div v-if="loadingCategories" class="flex items-center justify-center py-10">
                <div class="h-7 w-7 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              </div>

              <nav v-else class="space-y-2">
                <section
                  v-for="section in navigationSections"
                  :key="section.id"
                  class=""
                >
                  <!-- Main category -->
                  <div class="flex items-center justify-between gap-4 py-3">
                    <NuxtLink
                      :to="categoryLink(section.id)"
                      @click="closeSidebar"
                      class="group/main relative inline-block text-[18px] font-medium uppercase tracking-[0.08em] text-black md:text-[20px]"
                    >
                      {{ section.name }}

                      <span
                        class="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/main:origin-left group-hover/main:scale-x-100"
                      />
                    </NuxtLink>

                    <button
                      v-if="section.children.length"
                      type="button"
                      @click="toggleCategorySection(section.id)"
                      class="flex h-8 w-8 shrink-0 items-center justify-center text-black"
                      :aria-expanded="!!openCategorySections[section.id]"
                      :aria-label="`${openCategorySections[section.id] ? 'Collapse' : 'Expand'} ${section.name}`"
                    >
                      <svg
                        class="h-5 w-5 transition-transform duration-300"
                        :class="{ 'rotate-180': openCategorySections[section.id] }"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <Transition
                    enter-active-class="overflow-hidden transition-all duration-300 ease-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-[600px] opacity-100"
                    leave-active-class="overflow-hidden transition-all duration-300 ease-in"
                    leave-from-class="max-h-[600px] opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div
                      v-if="section.children.length && openCategorySections[section.id]"
                      class="pb-5 pl-5"
                    >
                      <div class="flex flex-col">
                        <NuxtLink
                          v-for="child in section.children"
                          :key="child.id"
                          :to="categoryLink(child.id)"
                          @click="closeSidebar"
                          class="group/child flex items-center justify-between py-4 text-[17px] uppercase tracking-[0.12em] text-gray-500 transition-colors duration-300 hover:text-black"
                        >
                          <span class="relative inline-block">
                            {{ child.name }}

                            <span
                              class="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-black transition-transform duration-300 group-hover/child:origin-left group-hover/child:scale-x-100"
                            />
                          </span>
                        </NuxtLink>
                      </div>
                    </div>
                  </Transition>
                </section>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <CartPopup />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { DEFAULT_APP_LOGO } from "~/composables/useAppIdentity"
import { useProductRelationsApi } from "~/composables/useProductRelationsApi"

const props = withDefaults(defineProps<{
  forceWhiteHeader?: boolean
}>(), {
  forceWhiteHeader: false,
})

const router = useRouter()
const route = useRoute()
const auth = useAuth()
const { appName, logoUrl, loadAppIdentity } = useAppIdentity()
const { logout } = auth
const { getCartItemCount, togglePopupCart, loadCart } = useCart()
const { getTaxoListsByType } = useProductRelationsApi()

const cartItemCount = getCartItemCount
const isSidebarOpen = ref(false)
const isLoggingOut = ref(false)
const isScrolled = ref(false)
const isHydrated = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const loadingCategories = ref(false)

type NavigationCategory = {
  id: number
  name: string
  slug?: string | null
  parent: number | null
  children: NavigationCategory[]
}

const navigationSections = ref<NavigationCategory[]>([])
const openCategorySections = ref<Record<number, boolean>>({})

const isWhiteHeader = computed(() =>
  props.forceWhiteHeader || isScrolled.value || route.path !== '/',
)

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

const categoryLink = (categoryId: number) => ({
  path: "/products",
  query: {
    category_ids: String(categoryId),
  },
})

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleCategorySection = (categoryId: number) => {
  openCategorySections.value = {
    ...openCategorySections.value,
    [categoryId]: !openCategorySections.value[categoryId],
  }
}

const loadNavigationCategories = async () => {
  loadingCategories.value = true

  try {
    const [type2, type3] = await Promise.all([
      getTaxoListsByType(2),
      getTaxoListsByType(3),
    ])

    const rawCategories = [
      ...(type2.data?.data?.taxo_lists || []),
      ...(type3.data?.data?.taxo_lists || []),
    ]
      .filter((category: any) => category.taxonomy_status === "ACTIVE")
      .map((category: any) => ({
        id: category.id,
        name: category.taxonomy_name,
        slug: category.taxonomy_slug || null,
        parent: category.parent ?? null,
      }))

    const uniqueCategories = Array.from(
      new Map(rawCategories.map((category) => [category.id, category])).values(),
    )

    const parents = uniqueCategories
      .filter((category) => category.parent === null)
      .sort((a, b) => a.name.localeCompare(b.name))

    navigationSections.value = parents.map((parent) => ({
      ...parent,
      children: uniqueCategories
        .filter((category) => category.parent === parent.id)
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
  } catch (error) {
    console.error("Failed to load navigation categories:", error)
    navigationSections.value = []
  } finally {
    loadingCategories.value = false
  }
}

const handleLogout = async () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true
  try {
    await logout()
    closeSidebar()
    await router.push("/")
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    isLoggingOut.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isSidebarOpen.value) {
    closeSidebar()
  }
}

// Scroll detection for header style switch
const handleScroll = () => {
  isScrolled.value = window.scrollY > (window.innerHeight * 0.6 + 40 - 115)
}

onMounted(async () => {
  isHydrated.value = true
  if (!user.value) await auth.initAuth()
  await loadAppIdentity()
  await loadNavigationCategories()
  await loadCart()
  window.addEventListener("keydown", handleKeydown)
  window.addEventListener("scroll", handleScroll)
  handleScroll()
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ""
  }
  window.removeEventListener("keydown", handleKeydown)
  window.removeEventListener("scroll", handleScroll)
})

watch(isSidebarOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? "hidden" : ""
})

watch(
  () => route.path,
  () => {
    closeSidebar()
  },
)
</script>
