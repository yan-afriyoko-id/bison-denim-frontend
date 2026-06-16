<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 flex-1">
        <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12.5">
          <!-- Left Sidebar: Policy Navigation -->
          <PolicySidebar />

          <!-- Right Content: Terms & Conditions -->
          <div class="flex-1 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5">
            <h1 class="text-2xl sm:text-3xl md:text-[62px] font-medium text-[#1A1919] mb-3 sm:mb-5">
              Terms & Conditions
            </h1>
            <p class="text-sm sm:text-xl text-[#7B7B7B] mb-6 sm:mb-8">
              Terakhir diperbarui: 18 Mei 2026
            </p>

            <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-6 sm:mb-7.5">
              Dengan mengakses website {{ appName }}, Anda menyetujui seluruh syarat dan ketentuan berikut:
            </p>

            <!-- Section 1 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                1. Penggunaan Website
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Pengguna setuju menggunakan website hanya untuk tujuan yang sah dan tidak melanggar hukum yang berlaku.
              </p>
            </section>

            <!-- Section 2 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                2. Informasi Produk
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                {{ appName }} berusaha menampilkan informasi produk seakurat mungkin, namun kami tidak menjamin seluruh informasi selalu bebas dari kesalahan penulisan, warna, ukuran, maupun stok.
              </p>
            </section>

            <!-- Section 3 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                3. Hak Kekayaan Intelektual
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Seluruh isi website seperti:
              </p>
              <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1 mb-3">
                <li>Logo</li>
                <li>Desain</li>
                <li>Foto produk</li>
                <li>Teks</li>
                <li>Video</li>
                <li>Grafis</li>
              </ul>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                merupakan milik {{ appName }} dan tidak boleh digunakan tanpa izin tertulis.
              </p>
            </section>

            <!-- Section 4 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                4. Harga dan Perubahan Layanan
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Harga dan layanan dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
              </p>
            </section>

            <!-- Section 5 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                5. Pembatasan Tanggung Jawab
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                {{ appName }} tidak bertanggung jawab atas kerugian langsung maupun tidak langsung akibat penggunaan website.
              </p>
            </section>

            <!-- Section 6 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                6. Pelanggaran
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Kami berhak membatasi atau menghentikan akses pengguna yang melanggar ketentuan website.
              </p>
            </section>

            <!-- Section 7 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                7. Hukum yang Berlaku
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Syarat dan ketentuan ini mengikuti hukum yang berlaku di Republik Indonesia.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
const { appName } = useAppIdentity();

definePageMeta({
  layout: "default",
});

useHead({
  title: "Terms & Conditions",
  meta: [
    {
      name: "description",
      content: "Syarat dan ketentuan penggunaan website kami.",
    },
  ],
});
</script>
