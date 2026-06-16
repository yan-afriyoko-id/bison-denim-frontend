<template>
  <header class="sticky top-0 z-50 bg-white border-b border-[#E6E9F0]">
    <div
      class="bg-[#C4282B] flex justify-center items-center gap-1.5 sm:gap-2.5 py-1.5 sm:py-2.5 px-2"
      v-if="bannerText.topbanner"
    >
      <svg
        class="w-3.5 h-3.5 sm:w-4 sm:h-4"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3V4H9.5V11.5H6.422C6.199 10.6405 5.426 10 4.5 10C3.574 10 2.801 10.6405 2.578 11.5H2V9H1V12.5H2.578C2.801 13.3595 3.574 14 4.5 14C5.426 14 6.199 13.3595 6.422 12.5H10.578C10.801 13.3595 11.574 14 12.5 14C13.426 14 14.199 13.3595 14.422 12.5H16V8.422L15.9685 8.3435L14.9685 5.3435L14.86 5H10.5V3H0ZM0.5 5V6H5V5H0.5ZM10.5 6H14.1405L15 8.5625V11.5H14.422C14.199 10.6405 13.426 10 12.5 10C11.574 10 10.801 10.6405 10.578 11.5H10.5V6ZM1 7V8H4V7H1ZM4.5 11C5.0585 11 5.5 11.4415 5.5 12C5.5 12.5585 5.0585 13 4.5 13C3.9415 13 3.5 12.5585 3.5 12C3.5 11.4415 3.9415 11 4.5 11ZM12.5 11C13.0585 11 13.5 11.4415 13.5 12C13.5 12.5585 13.0585 13 12.5 13C11.9415 13 11.5 12.5585 11.5 12C11.5 11.4415 11.9415 11 12.5 11Z"
          fill="white"
        />
      </svg>

      <p class="text-[10px] sm:text-xs md:text-sm text-white text-center">
        <span class="hidden sm:inline font-normal">
          {{ bannerText.topbanner }}
        </span>
        <span class="sm:hidden font-normal">{{ bannerText.topbanner }}</span>
      </p>
    </div>
    <div
      class="max-w-screen-2xl mx-auto px-4 md:px-[31px] py-3 sm:py-4 md:py-5"
    >
      <div
        class="flex items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-[77px]"
      >
        <!-- Logo Section - Hidden on mobile -->
        <NuxtLink
          to="/"
          class="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer"
        >
          <NuxtImg
            v-if="logoUrl"
            :src="logoUrl"
            alt="Karsindo Logo"
            width="144"
            height="46"
            class="w-24 sm:w-32 md:w-36 h-[46px] object-contain"
          />
        </NuxtLink>

        <!-- Center: Search Section -->
        <div
          class="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 flex-1 justify-center max-w-5xl min-w-0"
        >
          <!-- Hamburger Button - Mobile Only -->
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="xl:hidden flex items-center justify-center bg-white border border-[#E6E9F0] px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 rounded-lg hover:cursor-pointer shrink-0"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5"
                stroke="#808080"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <!-- Kategori Button -->
          <button
            @click="isCategoryOpen = !isCategoryOpen"
            class="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-white border border-[#E6E9F0] px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg whitespace-nowrap hover:cursor-pointer shrink-0"
          >
            <span
              class="font-medium text-[rgba(26, 25, 25, 1)] hidden sm:inline text-sm md:text-base"
              >Kategori</span
            >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.75 9.75C7.14782 9.75 7.52936 9.90804 7.81066 10.1893C8.09196 10.4706 8.25 10.8522 8.25 11.25V14.25C8.25 14.6478 8.09196 15.0294 7.81066 15.3107C7.52936 15.592 7.14782 15.75 6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25C2.25 10.8522 2.40804 10.4706 2.68934 10.1893C2.97064 9.90804 3.35218 9.75 3.75 9.75H6.75ZM14.25 9.75C14.6478 9.75 15.0294 9.90804 15.3107 10.1893C15.592 10.4706 15.75 10.8522 15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25C10.8522 15.75 10.4706 15.592 10.1893 15.3107C9.90804 15.0294 9.75 14.6478 9.75 14.25V11.25C9.75 10.8522 9.90804 10.4706 10.1893 10.1893C10.4706 9.90804 10.8522 9.75 11.25 9.75H14.25ZM6.75 2.25C7.14782 2.25 7.52936 2.40804 7.81066 2.68934C8.09196 2.97064 8.25 3.35218 8.25 3.75V6.75C8.25 7.14782 8.09196 7.52936 7.81066 7.81066C7.52936 8.09196 7.14782 8.25 6.75 8.25H3.75C3.35218 8.25 2.97064 8.09196 2.68934 7.81066C2.40804 7.52936 2.25 7.14782 2.25 6.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75ZM14.25 2.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V6.75C15.75 7.14782 15.592 7.52936 15.3107 7.81066C15.0294 8.09196 14.6478 8.25 14.25 8.25H11.25C10.8522 8.25 10.4706 8.09196 10.1893 7.81066C9.90804 7.52936 9.75 7.14782 9.75 6.75V3.75C9.75 3.35218 9.90804 2.97064 10.1893 2.68934C10.4706 2.40804 10.8522 2.25 11.25 2.25H14.25Z"
                fill="#808080"
              />
            </svg>
          </button>

          <!-- Search Bar -->
          <div
            class="flex-1 flex items-center border border-[#E6E9F0] rounded-lg px-1 sm:px-1.5 md:px-2 min-w-0 max-w-[180px] sm:max-w-none"
          >
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari Produk"
              @keyup.enter="handleSearch"
              class="flex-1 outline-none px-1.5 sm:px-2 md:px-2.5 py-1.5 sm:py-2 md:py-2.5 lg:py-3.5 h-full placeholder:text-[#808080] text-xs sm:text-sm md:text-base min-w-0"
            />
            <!-- Search Button -->
            <button
              @click="handleSearch"
              class="bg-[#E9322B] w-8 h-7 sm:w-9 sm:h-8 md:w-11.5 md:h-9 flex justify-center items-center text-white rounded-lg transition shrink-0 hover:cursor-pointer"
            >
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.375 2.16699C9.90667 2.16712 8.45964 2.51839 7.15464 3.19149C5.84965 3.8646 4.72455 4.84003 3.8732 6.03639C3.02186 7.23276 2.46896 8.61537 2.26063 10.0689C2.0523 11.5224 2.19459 13.0046 2.67562 14.392C3.15666 15.7793 3.96248 17.0315 5.02587 18.044C6.08926 19.0566 7.37938 19.8002 8.78859 20.2127C10.1978 20.6253 11.6852 20.6949 13.1268 20.4156C14.5684 20.1364 15.9223 19.5165 17.0755 18.6077L21.0319 22.564C21.2362 22.7613 21.5098 22.8705 21.7939 22.8681C22.0779 22.8656 22.3496 22.7517 22.5505 22.5508C22.7514 22.3499 22.8653 22.0782 22.8678 21.7942C22.8702 21.5101 22.761 21.2365 22.5637 21.0322L18.6074 17.0758C19.6777 15.718 20.3441 14.0863 20.5304 12.3674C20.7167 10.6485 20.4152 8.91185 19.6606 7.35626C18.906 5.80067 17.7287 4.48896 16.2634 3.57124C14.7981 2.65352 13.104 2.16688 11.375 2.16699ZM4.33336 11.3753C4.33336 9.50776 5.07525 7.71668 6.39582 6.39612C7.71639 5.07555 9.50747 4.33366 11.375 4.33366C13.2426 4.33366 15.0337 5.07555 16.3542 6.39612C17.6748 7.71668 18.4167 9.50776 18.4167 11.3753C18.4167 13.2429 17.6748 15.034 16.3542 16.3545C15.0337 17.6751 13.2426 18.417 11.375 18.417C9.50747 18.417 7.71639 17.6751 6.39582 16.3545C5.07525 15.034 4.33336 13.2429 4.33336 11.3753Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <div class="flex shrink-0">
            <!-- Shopping Cart -->
            <button
              @click="togglePopupCart()"
              class="px-2 sm:mx-1 sm:px-2 md:mx-3 md:px-2 lg:mx-5.5 lg:px-2 rounded-lg transition hover:cursor-pointer relative py-1"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 md:w-[26px] md:h-[26px]"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4H6.25L8.6875 17.8125H21.6875M8.6875 14.5625H21.3544C21.4483 14.5626 21.5394 14.5301 21.6121 14.4705C21.6848 14.411 21.7346 14.3281 21.753 14.236L23.2155 6.92348C23.2273 6.86451 23.2259 6.80366 23.2113 6.74532C23.1967 6.68698 23.1694 6.6326 23.1313 6.5861C23.0931 6.53961 23.0451 6.50216 22.9908 6.47646C22.9364 6.45077 22.877 6.43746 22.8169 6.4375H7.0625M10.3125 21.0625C10.3125 21.5112 9.94873 21.875 9.5 21.875C9.05127 21.875 8.6875 21.5112 8.6875 21.0625C8.6875 20.6138 9.05127 20.25 9.5 20.25C9.94873 20.25 10.3125 20.6138 10.3125 21.0625ZM21.6875 21.0625C21.6875 21.5112 21.3237 21.875 20.875 21.875C20.4263 21.875 20.0625 21.5112 20.0625 21.0625C20.0625 20.6138 20.4263 20.25 20.875 20.25C21.3237 20.25 21.6875 20.6138 21.6875 21.0625Z"
                  stroke="#1A1919"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <!-- Cart Badge -->
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 bg-[#E9322B] text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartItemCount > 99 ? "99+" : cartItemCount }}
              </span>
            </button>
            <!-- Separator -->
            <div class="hidden xl:block h-6.5 w-px bg-[#E6E9F0]"></div>
          </div>
        </div>

        <!-- Right: Auth Buttons / Profile -->
        <div class="hidden xl:flex items-center gap-2 sm:gap-2.5 shrink-0">
          <!-- If Not Authenticated: Show Login/Register -->
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/login"
              class="border border-[#E9322B] bg-white text-[#E9322B] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-[11.5px] rounded-lg font-medium whitespace-nowrap text-sm sm:text-base hover:bg-[#F8F8F8] transition cursor-pointer"
            >
              Masuk
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="bg-[#E9322B] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-[11.5px] rounded-lg hover:cursor-pointer font-medium whitespace-nowrap text-sm sm:text-base hover:bg-[#C4282B] transition"
            >
              Daftar
            </NuxtLink>
          </template>

          <!-- If Authenticated: Show Profile Dropdown -->
          <div v-else class="relative">
            <button
              @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-[#F8F8F8] transition"
            >
              <div
                class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E9322B] flex items-center justify-center text-white font-semibold text-sm sm:text-base"
              >
                <span v-if="user?.avatar">
                  <img
                    :src="user.avatar"
                    :alt="userName"
                    class="w-full h-full rounded-full object-cover"
                  />
                </span>
                <span v-else>{{ userName.charAt(0).toUpperCase() }}</span>
              </div>
              <span
                class="hidden sm:block text-sm sm:text-base font-medium text-[#1A1919]"
                >{{ userName }}</span
              >
              <svg
                class="w-4 h-4 text-[#808080]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Profile Dropdown Menu -->
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E6E9F0] py-2 z-50"
            >
              <div class="px-4 py-2 border-b border-[#E6E9F0]">
                <p class="text-sm font-semibold text-[#1A1919]">
                  {{ userName }}
                </p>
                <!-- <p class="text-xs text-[#808080]">{{ userEmail }}</p> -->
              </div>
              <NuxtLink
                to="/account"
                @click="isProfileMenuOpen = false"
                class="block px-4 py-2 text-sm text-[#1A1919] hover:bg-[#F8F8F8] transition cursor-pointer"
              >
                <span class="flex items-center gap-2">
                  <div class="w-4 h-4 shrink-0">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  Akun Saya
                </span>
              </NuxtLink>
              <NuxtLink
                to="/account/orders"
                @click="isProfileMenuOpen = false"
                class="block px-4 py-2 text-sm text-[#1A1919] hover:bg-[#F8F8F8] transition cursor-pointer"
              >
                <span class="flex items-center gap-2">
                  <div class="w-4 h-4 shrink-0">
                    <svg
                      class="w-full h-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 4H7C5.89543 4 5 4.89543 5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6C19 4.89543 18.1046 4 17 4Z"
                        stroke="#1A1919"
                        stroke-width="2"
                      />
                      <path
                        d="M9 9H15M9 13H15M9 17H13"
                        stroke="#1A1919"
                        stroke-linecap="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  Pesanan Saya
                </span>
              </NuxtLink>
              <NuxtLink
                to="/account/points"
                @click="isProfileMenuOpen = false"
                class="block px-4 py-2 text-sm text-[#1A1919] hover:bg-[#F8F8F8] transition cursor-pointer"
              >
                <span class="flex items-center gap-2">
                  <div class="w-4 h-4 shrink-0">
                    <svg
                      class="w-full h-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#1A1919"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  Poin Saya
                </span>
              </NuxtLink>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                :disabled="isLoggingOut"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {{ isLoggingOut ? "Keluar..." : "Keluar" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Navigation: Category List -->
      <div v-if="isCategoryOpen" class="pt-4 sm:pt-5">
        <nav
          class="flex items-center gap-4 sm:gap-6 md:gap-10 overflow-x-auto justify-start sm:justify-center pb-2"
        >
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="category.href"
            @click="isCategoryOpen = false"
            class="font-medium text-sm sm:text-base text-[#1A1919] hover:cursor-pointer transition whitespace-nowrap"
          >
            {{ category.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="xl:hidden fixed inset-0 bg-black/40 z-[60] transition-opacity"
    ></div>

    <!-- Mobile Sidebar -->
    <aside
      :class="[
        'xl:hidden fixed top-0 left-0 bottom-0 h-full w-[85%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar Header with Close Button -->
        <div
          class="flex items-center justify-between p-4 border-b border-[#E6E9F0]"
        >
          <NuxtLink
            to="/"
            @click="isSidebarOpen = false"
            class="flex items-center gap-2 sm:gap-3"
          >
            <NuxtImg
              :src="logoUrl"
              alt="Karsindo Logo"
              width="144"
              height="46"
              class="w-min h-[46px] object-contain"
            />
          </NuxtLink>
          <button
            @click="isSidebarOpen = false"
            class="p-2 hover:bg-[#F8F8F8] rounded-lg transition cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#1A1919"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Sidebar Content -->
        <div class="flex-1 flex flex-col gap-4 px-6 py-8">
          <!-- If Not Authenticated: Show Login/Register -->
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/login"
              @click="isSidebarOpen = false"
              class="w-full border border-[#E9322B] bg-white text-[#E9322B] px-5 py-3 rounded-lg font-medium text-center text-base hover:bg-[#F8F8F8] transition"
            >
              Masuk
            </NuxtLink>
            <NuxtLink
              to="/register"
              @click="isSidebarOpen = false"
              class="w-full bg-[#E9322B] text-white px-5 py-3 rounded-lg font-medium text-center text-base hover:bg-[#D0282B] transition cursor-pointer"
            >
              Daftar
            </NuxtLink>
          </template>

          <!-- If Authenticated: Show Profile Info and Logout -->
          <template v-else>
            <div class="px-4 py-3 border-b border-[#E6E9F0]">
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 rounded-full bg-[#E9322B] flex items-center justify-center text-white font-semibold"
                >
                  <span v-if="user?.avatar">
                    <img
                      :src="user.avatar"
                      :alt="userName"
                      class="w-full h-full rounded-full object-cover"
                    />
                  </span>
                  <span v-else>{{ userName.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-[#1A1919]">
                    {{ userName }}
                  </p>
                  <p class="text-xs text-[#808080]">{{ userEmail }}</p>
                </div>
              </div>
            </div>
            <NuxtLink
              to="/account"
              @click="isSidebarOpen = false"
              class="w-full px-5 py-3 rounded-lg font-medium text-center text-base text-[#1A1919] hover:bg-[#F8F8F8] transition flex items-center justify-center gap-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Akun Saya
            </NuxtLink>
            <NuxtLink
              to="/account/orders"
              @click="isSidebarOpen = false"
              class="w-full px-5 py-3 rounded-lg font-medium text-center text-base text-[#1A1919] hover:bg-[#F8F8F8] transition flex items-center justify-center gap-2"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 4H7C5.89543 4 5 4.89543 5 6V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6C19 4.89543 18.1046 4 17 4Z"
                  stroke="#1A1919"
                  stroke-width="2"
                />
                <path
                  d="M9 9H15M9 13H15M9 17H13"
                  stroke="#1A1919"
                  stroke-linecap="round"
                  stroke-width="2"
                />
              </svg>
              Pesanan Saya
            </NuxtLink>

            <NuxtLink
              to="/account/points"
              @click="isSidebarOpen = false"
              class="w-full px-5 py-3 rounded-lg font-medium text-center text-base text-[#1A1919] hover:bg-[#F8F8F8] transition flex items-center justify-center gap-2"
            >
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="#1A1919"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Poin Saya
            </NuxtLink>
            <button
              @click="handleLogout"
              class="w-full bg-red-50 text-red-600 px-5 py-3 rounded-lg font-medium text-center text-base hover:bg-red-100 transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              :disabled="isLoggingOut"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {{ isLoggingOut ? "Keluar..." : "Keluar" }}
            </button>
          </template>
        </div>
      </div>
    </aside>

    <!-- Cart Popup -->
    <CartPopup />
  </header>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const auth = useAuth();
const { logout } = auth;
const { getCartItemCount, togglePopupCart, loadCart } = useCart();
const { getTaxoListsByType } = useProductRelationsApi();
const { getMultiplePublicConfigs } = useConfigApi();

const cartItemCount = getCartItemCount;
const isCategoryOpen = ref(false);
const isSidebarOpen = ref(false);
const isProfileMenuOpen = ref(false);
const isLoggingOut = ref(false);
const logoUrl = ref<string | null>(null);
const categories = ref<Array<{ id: number; name: string; href: string }>>([]);
const bannerText = ref<Record<string, string | null>>({});

const isAuthenticated = auth.isAuthenticated;
const user = auth.user;

// Debug: Watch auth state changes
watch(
  [isAuthenticated, user],
  ([authVal, userVal]) => {
    if (process.client) {
      console.log("Auth state changed:", {
        isAuthenticated: authVal,
        hasUser: !!userVal,
        user: userVal,
      });
    }
  },
  { immediate: true },
);

const userName = computed(() => {
  if (!user.value) return "User";

  const nameToDisplay =
    user.value.name || user.value.email?.split("@")[0] || "User";

  return nameToDisplay.trim().slice(0, 10);
});

const userEmail = computed(() => {
  return user.value?.email || "";
});

const searchQuery = ref("");

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/products" && route.query.search) {
      searchQuery.value = (route.query.search as string) || "";
    } else if (newPath !== "/products") {
      searchQuery.value = "";
    }
  },
  { immediate: true },
);

watch(
  () => route.query.search,
  (newSearch) => {
    if (route.path === "/products") {
      searchQuery.value = (newSearch as string) || "";
    }
  },
);

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    router.push({
      path: "/products",
      query: { search: query },
    });
  } else {
    router.push("/products");
  }
};

const loadCategories = async () => {
  try {
    const [type2, type3] = await Promise.all([
      getTaxoListsByType(2),
      getTaxoListsByType(3),
    ]);

    const categories2 = type2.data?.data?.taxo_lists || [];
    const categories3 = type3.data?.data?.taxo_lists || [];

    categories.value = [...categories2, ...categories3]
      .filter((cat) => cat.taxonomy_status === "ACTIVE")
      .map((cat) => ({
        id: cat.id,
        name: cat.taxonomy_name,
        href: `/products?category_ids=${cat.id}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  } catch (err) {
    categories.value = [];
  }
};

const loadLogo = async () => {
  try {
    const { fetchPublicConfig } = useConfig();

    const res = await fetchPublicConfig("store_logo_website");
    if (!res) return;

    const configData = res?.data;
    if (configData) {
      const data = configData as any;

      if (data.value_image) {
        logoUrl.value = data.value_image;
      }
    }
  } catch (error) {
    console.error("Failed to load logo from config:", error);
  }
};

// Prevent body scroll when sidebar is open
watch(isSidebarOpen, (newValue) => {
  if (process.client) {
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

const handleLogout = async () => {
  if (isLoggingOut.value) return;

  isLoggingOut.value = true;
  isProfileMenuOpen.value = false;
  isSidebarOpen.value = false;

  try {
    await logout();
    await router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    isLoggingOut.value = false;
  }
};

onMounted(async () => {
  // Initialize auth to fetch user if token exists
  // This is a fallback in case plugin hasn't run yet
  if (!user.value) {
    await auth.initAuth();
  }

  // Load categories from database
  await loadCategories();

  loadLogo();

  // Sync cart on mount
  await loadCart();

  // Close profile dropdown when clicking outside
  if (process.client) {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".relative")) {
        isProfileMenuOpen.value = false;
      }
    });
  }
});

onMounted(async () => {
  const keys = ["topbanner"];

  const { data } = await getMultiplePublicConfigs(keys);

  if (data) {
    bannerText.value = data;
  }
});

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = "";
  }
});
</script>
