<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 flex-1">
      <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12.5">
        <!-- Left Sidebar: Account Navigation -->
        <AccountSidebar />

        <!-- Right Content: Profile Form -->
        <div class="flex-1 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5">
          <h1 class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919] mb-6 sm:mb-8">
            Informasi Saya
          </h1>

          <form @submit.prevent="handleSave" class="bg-white">
            <!-- Nama -->
            <div class="mb-4 sm:mb-5">
              <label class="block text-sm sm:text-base md:text-lg text-[#808080] mb-1.5"> Nama Depan </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-2 sm:px-2.5 py-2.5 sm:py-3.5 border border-[#E6E9F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan nama"
              />
            </div>
            <div class="mb-4 sm:mb-5">
              <label class="block text-sm sm:text-base md:text-lg text-[#808080] mb-1.5"> Nama belakang </label>
              <input
                v-model="form.last_name"
                type="text"
                class="w-full px-2 sm:px-2.5 py-2.5 sm:py-3.5 border border-[#E6E9F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan nama"
              />
            </div>

            <!-- Jenis Kelamin -->
            <div class="mb-4 sm:mb-5">
              <label class="block text-sm sm:text-base md:text-lg text-[#808080] mb-1.5">
                Jenis Kelamin
              </label>
              <div class="flex gap-4 sm:gap-5">
                <label class="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
                  <input
                    v-model="form.gender"
                    type="radio"
                    value="MALE"
                    class="w-4 h-4 sm:w-5 sm:h-5 text-[#E9322B] focus:ring-[#E9322B]"
                  />
                  <span class="text-sm sm:text-base md:text-lg text-[#1A1919]">Laki-laki</span>
                </label>
                <label class="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
                  <input
                    v-model="form.gender"
                    type="radio"
                    value="FEMALE"
                    class="w-4 h-4 sm:w-5 sm:h-5 text-[#E9322B] focus:ring-[#E9322B]"
                  />
                  <span class="text-sm sm:text-base md:text-lg text-[#1A1919]">Perempuan</span>
                </label>
              </div>
            </div>

            <!-- Tanggal Lahir -->
            <div class="mb-4 sm:mb-5">
              <label class="block text-sm sm:text-base md:text-lg text-[#808080] mb-1.5">
                Tanggal Lahir
              </label>
              <input
                v-model="form.dob"
                type="date"
                class="w-full px-2 sm:px-2.5 py-2.5 sm:py-3.5 border border-[#E6E9F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <!-- Email -->
            <div class="mb-4 sm:mb-5">
              <div class="flex items-center gap-2 sm:gap-2.5 mb-2 flex-wrap">
                <label class="text-sm sm:text-base md:text-lg text-[#808080]"> Email </label>
                <span
                  v-if="isEmailVerified"
                  class="flex items-center gap-[3px] px-2 sm:px-2.5 py-1.5 sm:py-2 bg-[#DCFFCF] text-[#4D9035] rounded-lg text-xs font-medium whitespace-nowrap"
                >
                  <div class="w-3 h-3 sm:w-3.5 sm:h-3.5">
                    <svg
                      class="w-full h-full"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 1.125C5.03582 1.125 4.09329 1.41091 3.2916 1.94659C2.48991 2.48226 1.86507 3.24363 1.49609 4.13442C1.12711 5.02521 1.03057 6.00541 1.21867 6.95107C1.40678 7.89672 1.87108 8.76537 2.55286 9.44715C3.23464 10.1289 4.10328 10.5932 5.04894 10.7813C5.99459 10.9694 6.97479 10.8729 7.86558 10.5039C8.75637 10.1349 9.51775 9.51009 10.0534 8.70841C10.5891 7.90672 10.875 6.96418 10.875 6C10.8736 4.70749 10.3596 3.46831 9.44564 2.55436C8.5317 1.64042 7.29251 1.12636 6 1.125ZM8.14032 5.14031L5.51532 7.76531C5.48049 7.80018 5.43913 7.82784 5.39361 7.84671C5.34808 7.86558 5.29928 7.8753 5.25 7.8753C5.20072 7.8753 5.15192 7.86558 5.1064 7.84671C5.06088 7.82784 5.01952 7.80018 4.98469 7.76531L3.85969 6.64031C3.78932 6.56995 3.74979 6.47451 3.74979 6.375C3.74979 6.27549 3.78932 6.18005 3.85969 6.10969C3.93005 6.03932 4.02549 5.99979 4.125 5.99979C4.22451 5.99979 4.31995 6.03932 4.39032 6.10969L5.25 6.96984L7.60969 4.60969C7.64453 4.57485 7.68589 4.54721 7.73142 4.52835C7.77694 4.5095 7.82573 4.49979 7.875 4.49979C7.92428 4.49979 7.97307 4.5095 8.01859 4.52835C8.06411 4.54721 8.10547 4.57485 8.14032 4.60969C8.17516 4.64453 8.20279 4.68589 8.22165 4.73141C8.24051 4.77694 8.25021 4.82573 8.25021 4.875C8.25021 4.92427 8.24051 4.97306 8.22165 5.01859C8.20279 5.06411 8.17516 5.10547 8.14032 5.14031Z"
                        fill="#4D9035"
                      />
                    </svg>
                  </div>

                  Terverifikasi
                </span>
              </div>
              <input
                v-model="form.email"
                type="email"
                class="w-full px-2 sm:px-2.5 py-2.5 sm:py-3.5 border border-[#E6E9F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan email"
              />
            </div>

            <!-- Nomor HP -->
            <div class="mb-6 sm:mb-8">
              <div class="flex items-center gap-2 sm:gap-2.5 mb-2 flex-wrap">
                <label class="text-sm sm:text-base md:text-lg text-[#808080]"> Nomor HP </label>
                <span
                  v-if="isPhoneVerified"
                  class="flex items-center gap-[3px] px-2 sm:px-2.5 py-1.5 sm:py-2 bg-[#DCFFCF] text-[#4D9035] rounded-lg text-xs font-medium whitespace-nowrap"
                >
                  <div class="w-3 h-3 sm:w-3.5 sm:h-3.5">
                    <svg
                      class="w-full h-full"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 1.125C5.03582 1.125 4.09329 1.41091 3.2916 1.94659C2.48991 2.48226 1.86507 3.24363 1.49609 4.13442C1.12711 5.02521 1.03057 6.00541 1.21867 6.95107C1.40678 7.89672 1.87108 8.76537 2.55286 9.44715C3.23464 10.1289 4.10328 10.5932 5.04894 10.7813C5.99459 10.9694 6.97479 10.8729 7.86558 10.5039C8.75637 10.1349 9.51775 9.51009 10.0534 8.70841C10.5891 7.90672 10.875 6.96418 10.875 6C10.8736 4.70749 10.3596 3.46831 9.44564 2.55436C8.5317 1.64042 7.29251 1.12636 6 1.125ZM8.14032 5.14031L5.51532 7.76531C5.48049 7.80018 5.43913 7.82784 5.39361 7.84671C5.34808 7.86558 5.29928 7.8753 5.25 7.8753C5.20072 7.8753 5.15192 7.86558 5.1064 7.84671C5.06088 7.82784 5.01952 7.80018 4.98469 7.76531L3.85969 6.64031C3.78932 6.56995 3.74979 6.47451 3.74979 6.375C3.74979 6.27549 3.78932 6.18005 3.85969 6.10969C3.93005 6.03932 4.02549 5.99979 4.125 5.99979C4.22451 5.99979 4.31995 6.03932 4.39032 6.10969L5.25 6.96984L7.60969 4.60969C7.64453 4.57485 7.68589 4.54721 7.73142 4.52835C7.77694 4.5095 7.82573 4.49979 7.875 4.49979C7.92428 4.49979 7.97307 4.5095 8.01859 4.52835C8.06411 4.54721 8.10547 4.57485 8.14032 4.60969C8.17516 4.64453 8.20279 4.68589 8.22165 4.73141C8.24051 4.77694 8.25021 4.82573 8.25021 4.875C8.25021 4.92427 8.24051 4.97306 8.22165 5.01859C8.20279 5.06411 8.17516 5.10547 8.14032 5.14031Z"
                        fill="#4D9035"
                      />
                    </svg>
                  </div>

                  Terverifikasi
                </span>
              </div>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-2 sm:px-2.5 py-2.5 sm:py-3.5 border border-[#E6E9F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E9322B] focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan nomor HP"
              />
            </div>

            <!-- Save Button -->
            <button
              type="submit"
              :disabled="isSaving"
              class="w-full py-2 sm:py-2.5 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#D32A24] transition cursor-pointer"
            >
              {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useAuth } from "~/composables/useAuth"
import { useProfileApi } from '~/composables/useProfileApi'
const { showToast } = useToast()

definePageMeta({
  layout: "default",
});

const auth = useAuth()
const { updateProfile } = useProfileApi()

const form = ref({
  name: "",
  last_name: "",
  gender: "",
  dob: "",
  email: "",
  phone: "",
})

const isEmailVerified = ref(false)
const isPhoneVerified = ref(false)

onMounted(async () => {
  await auth.fetchUser()

  if (auth.user.value) {
    const user = auth.user.value

    form.value.name = user.name ?? ""
    form.value.last_name = user.last_name ?? ""
    form.value.gender = user.gender ?? ""
    form.value.dob = user.dob ?? ""
    form.value.email = user.email ?? ""
    form.value.phone = user.phone ?? ""

    isEmailVerified.value = !!user.email_verified_at
    isPhoneVerified.value = !!user.phone_verified_at
  }
})

const isSaving = ref(false)
const saveError = ref<string | null>(null)

const handleSave = async () => {
  isSaving.value = true
  saveError.value = null

  try {
    // Uncomment the following block when email update is implemented
    // if (isEmailVerified.value && form.value.email !== auth.user.value?.email) {
    //   const confirmChange = confirm(
    //     "Email Anda sudah terverifikasi. Mengubahnya akan menghapus status verifikasi. Lanjutkan?"
    //   )
    //   if (!confirmChange) {
    //     isSaving.value = false
    //     return
    //   }
    // }

    const { data, error } = await updateProfile({
      name: form.value.name,
      last_name: form.value.last_name,
      gender: form.value.gender as 'MALE' | 'FEMALE',
      dob: form.value.dob,
      // email: form.value.email, // Uncomment when email update is implemented
      phone: form.value.phone,
    })

    if (error || !data?.success) {
      saveError.value = error?.message || data?.message || "Gagal memperbarui profil."
      showToast(`${saveError.value}`, "error")
      return
    }

    showToast("Profil berhasil diperbarui.", "success")

    await auth.fetchUser()

    isEmailVerified.value = !!auth.user.value?.email_verified_at
    isPhoneVerified.value = !!auth.user.value?.phone_verified_at
  } catch (e: any) {
    saveError.value = e.message || "Terjadi kesalahan saat menyimpan."
    showToast(`${saveError.value}`, "error")
  } finally {
    isSaving.value = false
  }
}
</script>
