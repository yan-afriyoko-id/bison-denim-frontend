<template>
  <div class="min-h-screen bg-white font-poppins flex flex-col">
    <Header />

    <main class="flex-1 flex items-center justify-center px-6 py-16">
      <div class="max-w-xl w-full text-center">
        <p class="text-sm font-semibold tracking-[0.24em] text-[#7B7B7B] uppercase mb-4">
          {{ isNotFound ? "404" : "Error" }}
        </p>
        <h1 class="text-3xl sm:text-5xl font-semibold text-[#1A1919] mb-4">
          {{ isNotFound ? "Produk tidak ditemukan" : "Terjadi kesalahan" }}
        </h1>
        <p class="text-sm sm:text-base text-[#7B7B7B] max-w-md mx-auto">
          {{
            isNotFound
              ? "Halaman yang kamu cari tidak tersedia atau sudah dihapus."
              : "Ada masalah saat membuka halaman ini. Coba kembali ke beranda."
          }}
        </p>

        <div class="mt-8 flex items-center justify-center gap-3">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-5 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition"
          >
            Kembali ke Beranda
          </NuxtLink>
          <button
            v-if="!isNotFound"
            @click="clearError({ redirect: '/' })"
            class="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[#E6E9F0] text-sm font-medium text-[#1A1919] hover:bg-[#F8F8F8] transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </main>

    <Footer />
    <LayoutWhatsAppButton />
  </div>
</template>

<script setup lang="ts">
const error = useError()

const isNotFound = computed(() => error.value?.statusCode === 404)
</script>
