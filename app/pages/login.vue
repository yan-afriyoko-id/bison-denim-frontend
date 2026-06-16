<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div
        class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-11 py-8 sm:py-12 md:py-16 flex-1"
      >
        <div class="flex justify-center">
          <div class="w-full max-w-md">
            <!-- Login Card -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-lg shadow-sm p-6 sm:p-8"
            >
              <div class="text-center mb-6">
                <h1
                  class="text-2xl sm:text-3xl font-semibold text-[#1A1919] mb-2"
                >
                  Login
                </h1>
                <p class="text-sm sm:text-base text-[#808080]">
                  Masukkan email dan password untuk masuk
                </p>
              </div>

              <!-- Success Message -->
              <div
                v-if="successMessage"
                class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <svg
                  class="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-green-800 flex-1">
                  {{ successMessage }}
                </p>
                <button
                  @click="successMessage = ''"
                  class="text-green-600 hover:text-green-800"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Error Message -->
              <div
                v-if="localError"
                class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <svg
                  class="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-sm text-red-800 flex-1">{{ localError }}</p>
                <button
                  @click="clearError"
                  class="text-red-600 hover:text-red-800"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <!-- Login Form -->
              <form
                @submit.prevent="handleLogin"
                class="space-y-4 sm:space-y-5"
              >
                <!-- Email -->
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-[#1A1919] mb-2"
                    >Email</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-[#808080]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="formData.email"
                      type="email"
                      id="email"
                      class="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="your@email.com"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>

                <!-- Password -->
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-[#1A1919] mb-2"
                    >Password</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-[#808080]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="formData.password"
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      class="w-full pl-10 pr-10 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="Masukkan password"
                      required
                      :disabled="isLoading"
                    />

                    <button
                      type="button"
                      @click="togglePassword"
                      :disabled="isLoading"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#808080] hover:text-[#1A1919] hover:cursor-pointer"
                    >
                      <svg
                        v-if="!showPassword"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c-1.5 4-5 7-9 7s-7.5-3-9-7c1.5-4 5-7 9-7s7.5 3 9 7z"
                        />
                      </svg>

                      <svg
                        v-else
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4 0-7.5-3-9-7a9.956 9.956 0 012.167-3.338M6.223 6.223A9.956 9.956 0 0112 5c4 0 7.5 3 9 7a9.965 9.965 0 01-4.293 5.293M15 12a3 3 0 00-4.243-2.828M9.88 9.88L14.12 14.12M3 3l18 18"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      v-model="formData.rememberMe"
                      type="checkbox"
                      class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B]"
                      :disabled="isLoading"
                    />
                    <span class="text-sm text-[#1A1919]">Ingat saya</span>
                  </label>
                  <NuxtLink
                    to="/forgot-password"
                    class="text-sm text-[#E9322B] hover:underline"
                  >
                    Lupa password?
                  </NuxtLink>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full bg-[#E9322B] text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#C4282B] transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  :disabled="isLoading"
                >
                  <svg
                    v-if="isLoading"
                    class="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{{ isLoading ? "Memproses..." : "Login" }}</span>
                </button>

                <!-- Register Link -->
                <div class="text-center pt-4 border-t border-[#E6E9F0]">
                  <p class="text-sm text-[#808080]">
                    Belum punya akun?
                    <NuxtLink
                      to="/register"
                      class="text-[#E9322B] font-semibold hover:underline"
                    >
                      Daftar sekarang
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
import { useRoute } from "vue-router";
import { navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";

definePageMeta({
  middleware: "guest",
  layout: "default",
});

useHead({
  title: "Login",
});

const route = useRoute();
const { login } = useAuth();
const token = useCookie("auth_token");
const { fetchPublicConfig } = useConfig();

const logoUrl = ref<string | null>(null);
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogoError = () => {
  logoUrl.value = "/assets/img/logo.png";
};

const loadLogo = async () => {
  try {
    const response = await fetchPublicConfig("store_logo_website");
    if (!response) return;

    const configData = response?.data;
    if (configData) {
      if (configData.value_image) {
        logoUrl.value = configData.value_image;
      } else if (configData.value && typeof configData.value === "string") {
        logoUrl.value = configData.value;
      }
    }
  } catch (error) {
    console.error("Failed to load logo:", error);
  }
};

onMounted(() => {
  loadLogo();
});

const isLoading = ref(false);
let isMounted = true;

const error = ref("");
const localError = computed(() => error.value || "");

const clearError = () => {
  error.value = "";
};

const formData = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const successMessage = ref("");

onMounted(() => {
  clearError();

  if (route.query.registered === "true") {
    successMessage.value =
      "Registrasi berhasil! Silakan login dengan kredensial Anda.";

    setTimeout(() => {
      successMessage.value = "";
    }, 5000);
  }
});

const handleLogin = async () => {
  if (!formData.value?.email || !formData.value?.password) {
    return;
  }

  if (!isMounted) return;

  isLoading.value = true;
  error.value = "";
  successMessage.value = "";

  try {
    const result = await login(formData.value.email, formData.value.password);

    if (!isMounted) return;

    if (!result.success || result.error) {
      if (isMounted) {
        // Display the error message from API response
        error.value = result.error?.message || "Login gagal";

        // Check for email not verified status
        const errorData = result.error?.data;
        if (
          errorData?.status === "email_not_verified" ||
          result.error?.message?.toLowerCase().includes("email not verified") ||
          result.error?.message
            ?.toLowerCase()
            .includes("email belum diverifikasi")
        ) {
          // Redirect to resend verification page after showing message
          setTimeout(() => {
            if (isMounted && typeof window !== "undefined") {
              const email = errorData?.email || formData.value.email;
              window.location.href = `/resend-verification?email=${encodeURIComponent(email)}`;
            }
          }, 3000); // Give user time to read the message
        }

        isLoading.value = false;
      }
    } else {
      if (formData.value.rememberMe && isMounted) {
        const rememberedEmailCookie = useCookie<string>("remembered_email", {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        rememberedEmailCookie.value = formData.value.email;
      }

      await nextTick();

      if (!isMounted) return;

      // FE Login: Only allow User role (block Admin/Super Admin/Manager)
      const adminRoles = ["Super Admin", "Admin", "Manager"];
      const userRoles = result.data?.user?.roles || [];
      const isAdmin = userRoles.some((role: any) => {
        const roleName = typeof role === "string" ? role : role?.name;
        return roleName && adminRoles.includes(roleName);
      });

      // Block login if user is admin
      if (isAdmin) {
        if (isMounted) {
          error.value = "Akses ditolak. Admin harus login melalui CMS.";
          isLoading.value = false;

          // Clear token and user data without redirect
          token.value = null;
          // User state will be cleared automatically when token is null
        }
        return;
      }

      // Check for redirect parameter, otherwise redirect to homepage
      const redirectParam = route.query.redirect as string | undefined;
      let redirectPath = "/";

      // If redirect parameter exists and is valid, use it
      if (redirectParam) {
        try {
          const decodedPath = decodeURIComponent(redirectParam);
          // Validate that it's a relative path (security check)
          if (decodedPath.startsWith("/") && !decodedPath.startsWith("//")) {
            redirectPath = decodedPath;
          }
        } catch (e) {
          console.error("Invalid redirect parameter:", e);
        }
      }

      if (isMounted) {
        isLoading.value = false;
      }

      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!isMounted) return;

      try {
        await navigateTo(redirectPath);
      } catch (err) {
        console.error("Navigation error:", err);
        if (typeof window !== "undefined") {
          window.location.href = redirectPath;
        }
      }
    }
  } catch (err) {
    if (isMounted) {
      error.value = err instanceof Error ? err.message : "Login gagal";
      isLoading.value = false;
    }
  }
};

onMounted(() => {
  isMounted = true;

  const rememberedEmailCookie = useCookie<string>("remembered_email");

  if (rememberedEmailCookie.value && formData.value) {
    formData.value.email = rememberedEmailCookie.value;
    formData.value.rememberMe = true;
  }
});

onBeforeUnmount(() => {
  isMounted = false;
  isLoading.value = false;
});
</script>
