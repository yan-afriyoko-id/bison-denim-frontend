<template>
  <div class="flex min-h-screen flex-col bg-white font-poppins">
    <Header force-white-header />

    <main class="flex flex-1 items-center justify-center px-6 py-16">
      <div class="w-full max-w-xl text-center">
        <p class="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#7B7B7B]">
          {{ isNotFound ? "404" : error.statusCode }}
        </p>

        <h1 class="mb-4 text-3xl font-semibold text-[#1A1919] sm:text-5xl">
          {{ isNotFound ? "Produk tidak ditemukan" : "Terjadi kesalahan" }}
        </h1>

        <p class="mx-auto max-w-md text-sm text-[#7B7B7B] sm:text-base">
          {{
            isNotFound
              ? "Halaman yang kamu cari tidak tersedia atau sudah dihapus."
              : "Terjadi kesalahan saat memuat halaman."
          }}
        </p>

        <div class="mt-8 flex justify-center gap-3">
          <button
            class="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80"
            @click="clearError({ redirect: '/' })"
          >
            Kembali ke Beranda
          </button>

          <button
            v-if="!isNotFound"
            class="rounded-full border border-[#E6E9F0] px-5 py-3 text-sm font-medium text-[#1A1919] transition hover:bg-[#F8F8F8]"
            @click="clearError()"
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