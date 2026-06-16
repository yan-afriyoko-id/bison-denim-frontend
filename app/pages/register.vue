<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div
        class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-11 py-8 sm:py-12 md:py-16 flex-1"
      >
        <div class="flex justify-center">
          <div class="w-full max-w-2xl">
            <!-- Register Card -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-lg shadow-sm p-6 sm:p-8"
            >
              <div class="text-center mb-6">
                <h1
                  class="text-2xl sm:text-3xl font-semibold text-[#1A1919] mb-2"
                >
                  Daftar Akun
                </h1>
              </div>

              <!-- Alert Messages -->
              <div
                v-if="showAlert"
                :class="[
                  'mb-4 p-4 rounded-lg flex items-start gap-3',
                  alertType === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : alertType === 'error'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-yellow-50 border border-yellow-200',
                ]"
              >
                <svg
                  v-if="alertType === 'success'"
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
                <svg
                  v-else-if="alertType === 'error'"
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
                <svg
                  v-else
                  class="w-5 h-5 text-yellow-600 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div class="flex-1">
                  <p
                    class="font-semibold text-sm"
                    :class="[
                      alertType === 'success'
                        ? 'text-green-800'
                        : alertType === 'error'
                          ? 'text-red-800'
                          : 'text-yellow-800',
                    ]"
                  >
                    {{ alertTitle }}
                  </p>
                  <p
                    class="text-sm mt-1"
                    :class="[
                      alertType === 'success'
                        ? 'text-green-700'
                        : alertType === 'error'
                          ? 'text-red-700'
                          : 'text-yellow-700',
                    ]"
                  >
                    {{ alertMessage }}
                  </p>
                </div>
                <button
                  @click="closeAlert"
                  :class="[
                    alertType === 'success'
                      ? 'text-green-600 hover:text-green-800'
                      : alertType === 'error'
                        ? 'text-red-600 hover:text-red-800'
                        : 'text-yellow-600 hover:text-yellow-800',
                  ]"
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

              <!-- Register Form -->
              <form
                @submit.prevent="handleRegister"
                class="space-y-4 sm:space-y-5"
              >
                <!-- Name Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <!-- First Name -->
                  <div>
                    <label
                      for="firstName"
                      class="block text-sm font-medium text-[#1A1919] mb-2"
                      >Nama Depan</label
                    >
                    <input
                      v-model="formData.name"
                      type="text"
                      id="firstName"
                      class="w-full px-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="John"
                      required
                      :disabled="isLoading"
                    />
                  </div>

                  <!-- Last Name -->
                  <div>
                    <label
                      for="lastName"
                      class="block text-sm font-medium text-[#1A1919] mb-2"
                      >Nama Belakang</label
                    >
                    <input
                      v-model="formData.last_name"
                      type="text"
                      id="lastName"
                      class="w-full px-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="Doe"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>

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

                <!-- Phone -->
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-[#1A1919] mb-2"
                    >Nomor Telepon</label
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="formData.phone"
                      type="tel"
                      id="phone"
                      class="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="+62812345678"
                      required
                      :disabled="isLoading"
                    />
                  </div>
                </div>

                <!-- DOB & Gender Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <!-- Date of Birth -->
                  <div>
                    <label
                      for="dob"
                      class="block text-sm font-medium text-[#1A1919] mb-2"
                      >Tanggal Lahir</label
                    >
                    <input
                      v-model="formData.dob"
                      type="date"
                      id="dob"
                      class="w-full px-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      required
                      :disabled="isLoading"
                    />
                  </div>

                  <!-- Gender -->
                  <div>
                    <label
                      for="gender"
                      class="block text-sm font-medium text-[#1A1919] mb-2"
                      >Jenis Kelamin</label
                    >
                    <select
                      v-model="formData.gender"
                      id="gender"
                      class="w-full px-4 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base bg-white"
                      required
                      :disabled="isLoading"
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="MALE">Laki-laki</option>
                      <option value="FEMALE">Perempuan</option>
                    </select>
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
                      placeholder="Minimal 8 karakter"
                      required
                      minlength="8"
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
                          d="M3 3l18 18M9.88 9.88A3 3 0 0115 12m6 0c-1.5 4-5 7-9 7a8.96 8.96 0 01-4.293-1.093M6.223 6.223A8.96 8.96 0 0112 5c4 0 7.5 3 9 7a9.97 9.97 0 01-2.167 3.338"
                        />
                      </svg>
                    </button>
                  </div>
                  <p class="mt-1 text-xs text-[#808080]">Minimal 8 karakter</p>
                </div>

                <!-- Confirm Password -->
                <div>
                  <label
                    for="passwordConfirm"
                    class="block text-sm font-medium text-[#1A1919] mb-2"
                    >Konfirmasi Password</label
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
                      v-model="formData.password_confirmation"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      id="password_confirmation"
                      class="w-full pl-10 pr-10 py-2.5 sm:py-3 border border-[#E6E9F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                      placeholder="Konfirmasi password"
                      required
                      :disabled="isLoading"
                    />

                    <button
                      type="button"
                      @click="toggleConfirmPassword"
                      :disabled="isLoading"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#808080] hover:text-[#1A1919] hover:cursor-pointer"
                    >
                      <svg
                        v-if="!showConfirmPassword"
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
                          d="M3 3l18 18M9.88 9.88A3 3 0 0115 12m6 0c-1.5 4-5 7-9 7a8.96 8.96 0 01-4.293-1.093M6.223 6.223A8.96 8.96 0 0112 5c4 0 7.5 3 9 7a9.97 9.97 0 01-2.167 3.338"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Terms & Conditions -->
                <div>
                  <label class="flex items-start gap-2 cursor-pointer">
                    <input
                      v-model="formData.agreeTerms"
                      type="checkbox"
                      class="w-4 h-4 mt-0.5 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B]"
                      required
                      :disabled="isLoading"
                    />
                    <span class="text-sm text-[#1A1919]">
                      Saya setuju dengan
                      <NuxtLink
                        to="/terms-and-conditions"
                        class="text-[#E9322B] hover:underline"
                        >syarat dan ketentuan</NuxtLink
                      >
                    </span>
                  </label>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full bg-[#E9322B] text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#C4282B] transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  :disabled="isLoading || !formData.agreeTerms"
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
                  <span>{{ isLoading ? "Membuat Akun..." : "Daftar" }}</span>
                </button>

                <!-- Login Link -->
                <div class="text-center pt-4 border-t border-[#E6E9F0]">
                  <p class="text-sm text-[#808080]">
                    Sudah punya akun?
                    <NuxtLink
                      to="/login"
                      class="text-[#E9322B] font-semibold hover:underline"
                    >
                      Login di sini
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
import { navigateTo } from "#app";
import { useAuth } from "~/composables/useAuth";
import { useAuthApi } from "~/composables/useAuthApi";

definePageMeta({
  middleware: "guest",
  layout: "default",
});

useHead({
  title: "Karsindo - Daftar",
});

const { isLoading, error, clearError } = useAuth();
const { register: registerApi } = useAuthApi();
const { fetchPublicConfig } = useConfig();

const logoUrl = ref<string | null>(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
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

const localError = computed(() => error.value);

const formData = ref({
  name: "",
  last_name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  password: "",
  password_confirmation: "",
  agreeTerms: false,
});

const showAlert = ref(false);
const alertType = ref<"success" | "error" | "warning">("success");
const alertTitle = ref("");
const alertMessage = ref("");

const closeAlert = () => {
  showAlert.value = false;
};

onMounted(() => {
  clearError();
});

const handleRegister = async () => {
  clearError();

  if (formData.value.password !== formData.value.password_confirmation) {
    alertType.value = "error";
    alertTitle.value = "Password Tidak Sama";
    alertMessage.value = "Password dan konfirmasi password harus sama!";
    showAlert.value = true;
    return;
  }

  if (!formData.value.agreeTerms) {
    alertType.value = "warning";
    alertTitle.value = "Setujui Syarat & Ketentuan";
    alertMessage.value =
      "Anda harus menyetujui syarat dan ketentuan untuk melanjutkan";
    showAlert.value = true;
    return;
  }

  try {
    isLoading.value = true;

    const { data, error: apiError } = await registerApi({
      name: formData.value.name,
      last_name: formData.value.last_name,
      email: formData.value.email,
      phone: formData.value.phone,
      dob: formData.value.dob,
      gender: formData.value.gender as "MALE" | "FEMALE",
      password: formData.value.password,
      password_confirmation: formData.value.password_confirmation,
    });

    if (apiError || !data?.success) {
      throw new Error(apiError?.message || data?.message || "Registrasi gagal");
    }

    if (data.success) {
      alertType.value = "success";
      alertTitle.value = "Registrasi Berhasil!";
      alertMessage.value = `Akun Anda telah berhasil dibuat! Silakan periksa email: ${formData.value.email} untuk menerima link verifikasi akun.`;
      showAlert.value = true;

      setTimeout(async () => {
        await navigateTo({
          path: "/login",
          query: { registered: "true" },
        });
      }, 3000);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registrasi gagal";

    alertType.value = "error";
    alertTitle.value = "Registrasi Gagal";
    alertMessage.value = message;
    showAlert.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>
