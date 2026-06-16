<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 flex-1">
        <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12.5">
          <!-- Left Sidebar: Policy Navigation -->
          <PolicySidebar />

          <!-- Right Content: Privacy Policy -->
          <div class="flex-1 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5">
            <h1 class="text-2xl sm:text-3xl md:text-[62px] font-medium text-[#1A1919] mb-3 sm:mb-5">
              Privacy Policy
            </h1>
            <p class="text-sm sm:text-xl text-[#7B7B7B] mb-6 sm:mb-8">
              Terakhir diperbarui: 18 Mei 2026
            </p>

            <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-6 sm:mb-7.5">
              Selamat datang di website Karsindo Furniture. <br> Karsindo menghargai dan melindungi privasi setiap pengunjung, pelanggan, dan pengguna layanan kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat menggunakan website kami.
            </p>
            <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-6 sm:mb-7.5">
              Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui isi Kebijakan Privasi ini.
            </p>

            <!-- Section 1 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-5">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-4">
                Kami dapat mengumpulkan beberapa jenis informasi, termasuk namun tidak terbatas pada:
              </p>

              <div class="mb-4 sm:mb-5">
                <h3 class="text-base sm:text-lg md:text-2xl font-medium text-[#1A1919] mb-2.5">
                  a. Informasi Pribadi
                </h3>
                <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1">
                  <li>Nama lengkap</li>
                  <li>Nomor telepon</li>
                  <li>Alamat email</li>
                  <li>Alamat pengiriman</li>
                  <li>Nama perusahaan/toko</li>
                  <li>Informasi lain yang diberikan secara sukarela melalui formulir kontak, WhatsApp, atau pemesanan</li>
                </ul>
              </div>

              <div>
                <h3 class="text-base sm:text-lg md:text-2xl font-medium text-[#1A1919] mb-2.5">
                  b. Informasi Teknis
                </h3>
                <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1">
                  <li>Alamat IP</li>
                  <li>Jenis perangkat</li>
                  <li>Browser yang digunakan</li>
                  <li>Lokasi umum</li>
                  <li>Riwayat kunjungan halaman website</li>
                  <li>Cookies dan data analitik lainnya</li>
                </ul>
              </div>
            </section>

            <!-- Section 2 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                2. Penggunaan Informasi
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Informasi yang kami kumpulkan digunakan untuk:
              </p>
              <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1">
                <li>Memproses permintaan dan pemesanan produk</li>
                <li>Menghubungi pelanggan terkait layanan atau transaksi</li>
                <li>Memberikan informasi produk, promo, atau penawaran terbaru</li>
                <li>Meningkatkan kualitas layanan dan pengalaman pengguna</li>
                <li>Analisis internal dan pengembangan website</li>
                <li>Keamanan sistem dan pencegahan penyalahgunaan</li>
              </ul>
            </section>

            <!-- Section 3 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                3. Perlindungan Data Pengguna
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Karsindo berkomitmen menjaga keamanan data pengguna dengan menerapkan langkah-langkah perlindungan yang wajar untuk mencegah:
              </p>
              <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1 mb-3">
                <li>Akses tanpa izin</li>
                <li>Penyalahgunaan data</li>
                <li>Perubahan atau penghapusan data secara ilegal</li>
                <li>Kebocoran informasi pribadi</li>
              </ul>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Namun demikian, kami tidak dapat menjamin keamanan absolut dari transmisi data melalui internet.
              </p>
            </section>

            <!-- Section 4 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                4. Penggunaan Cookies
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Website kami dapat menggunakan cookies untuk:
              </p>
              <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1 mb-3">
                <li>Menyimpan preferensi pengguna</li>
                <li>Memahami perilaku pengunjung</li>
                <li>Meningkatkan performa website</li>
                <li>Menampilkan konten yang lebih relevan</li>
              </ul>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Pengguna dapat mengatur browser untuk menolak sebagian atau seluruh cookies, namun beberapa fitur website mungkin tidak berfungsi dengan optimal.
              </p>
            </section>

            <!-- Section 5 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                5. Pembagian Informasi kepada Pihak Ketiga
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Karsindo tidak menjual atau menyewakan data pribadi pengguna kepada pihak lain.
              </p>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Informasi dapat dibagikan kepada pihak ketiga hanya apabila:
              </p>
              <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1">
                <li>Dibutuhkan untuk proses pengiriman atau layanan tertentu</li>
                <li>Diperlukan oleh hukum atau pemerintah yang berwenang</li>
                <li>Dibutuhkan untuk perlindungan hak dan keamanan Karsindo</li>
              </ul>
            </section>

            <!-- Section 6 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                6. Tautan ke Situs Lain
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Website kami dapat mengandung tautan menuju website pihak ketiga. Karsindo tidak bertanggung jawab atas isi maupun kebijakan privasi website pihak ketiga tersebut.
              </p>
            </section>

            <!-- Section 7 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                7. Hak Pengguna
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Pengguna berhak untuk:
              </p>
              <ul class="list-disc list-inside text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1 mb-3">
                <li>Meminta akses terhadap data pribadi</li>
                <li>Memperbaiki data yang tidak akurat</li>
                <li>Meminta penghapusan data tertentu</li>
                <li>Menarik persetujuan penggunaan data</li>
              </ul>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Permintaan dapat disampaikan melalui kontak resmi Karsindo.
              </p>
            </section>

            <!-- Section 8 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                8. Perubahan Kebijakan Privasi
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed">
                Karsindo dapat memperbarui Kebijakan Privasi ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan akan berlaku sejak dipublikasikan di halaman ini.
              </p>
            </section>

            <!-- Section 9 -->
            <section class="mb-6 sm:mb-7.5">
              <h2 class="text-lg sm:text-xl md:text-[32px] font-medium text-[#1A1919] mb-2.5">
                9. Kontak Kami
              </h2>
              <p class="text-sm sm:text-lg text-[#696969] leading-relaxed mb-3">
                Jika Anda memiliki pertanyaan terkait Kebijakan Privasi ini, silakan hubungi:
              </p>
              <div class="text-sm sm:text-lg text-[#696969] leading-relaxed space-y-1">
                <p class="font-medium text-[#1A1919]">Karsindo Furniture</p>
                <p>Email: kingsejahteraabadi@gmail.com</p>
                <p>WhatsApp: +62 821 3138 0720</p>
                <p>Alamat Operasional: Jalan Boulevard Raya Ruko Kuning No. 18 J, Medan Estate, Kec. Percut Sei Tuan, Kota Medan, Sumatera Utara 20371</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "Privacy Policy - Karsindo",
  meta: [
    {
      name: "description",
      content: "Kebijakan privasi penggunaan website Karsindo Furniture.",
    },
  ],
});
</script>
