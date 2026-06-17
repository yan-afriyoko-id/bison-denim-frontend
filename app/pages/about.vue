<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section class="w-full">
      <NuxtImg
        src="/assets/img/about/banner.jpg"
        :alt="appName ? `${appName} Showroom` : 'Showroom'"
        class="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[565px] object-cover"
        fit="cover"
      />
    </section>

    <!-- Tentang Kami Section -->
    <section class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-12.5 py-8 sm:py-12 md:py-15">
      <h2 class="text-lg sm:text-xl font-semibold text-[#E9322B] text-center mb-4 sm:mb-5">
        Tentang Kami
      </h2>
      <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-[#1A1919] text-center mb-2 sm:mb-4 mx-auto">
        Menciptakan Furnitur Berkualitas untuk Setiap Ruang
      </h3>
      <div class="mx-auto space-y-2 sm:space-y-3">
        <p class="text-sm sm:text-base md:text-lg text-[#696969] text-center leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus orci vitae ornare ultricies. Vivamus nisl nisi, efficitur a volutpat quis, pulvinar ut erat. Curabitur convallis bibendum elementum. Nulla facilisi. Nullam ultrices, enim ac volutpat hendrerit, lorem dolor efficitur sem, in malesuada sapien augue quis nunc. Praesent condimentum vehicula mi eget bibendum. Quisque pharetra augue ante, vitae suscipit ex gravida in.
        </p>
      </div>
    </section>

    <!-- Visi & Misi Section -->
    <section class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-12.5 py-6 md:py-7.5">
      <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-15.5">
        <!-- Image Left -->
        <div class="w-full lg:w-1/2">
          <NuxtImg
            src="/assets/img/about/about-1.jpg"
            :alt="appName ? `${appName} Team` : 'Team'"
            class="w-full h-auto object-cover rounded-[14px] object-right aspect-square"
            fit="cover"
          />
        </div>

        <!-- Content Right -->
        <div class="w-full lg:w-1/2 space-y-8 sm:space-y-10">
          <!-- Visi Kami -->
          <div>
            <h3 class="text-xl sm:text-2xl md:text-[32px] font-medium text-[#1A1919] mb-4 sm:mb-5">
              Visi Kami
            </h3>
            <div class="space-y-3 sm:space-y-4">
              <p class="text-sm sm:text-base md:text-lg text-[#696969] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus orci vitae ornare ultricies. Vivamus nisl nisi, efficitur a volutpat quis, pulvinar ut erat. Curabitur convallis bibendum elementum. Nulla facilisi. Nullam ultrices, enim ac volutpat hendrerit, lorem dolor efficitur sem, in malesuada sapien augue quis nunc. Praesent condimentum vehicula mi eget bibendum. Quisque pharetra augue ante, vitae suscipit ex gravida in.
              </p>
            </div>
          </div>

          <!-- Misi Kami -->
          <div>
            <h3 class="text-xl sm:text-2xl md:text-[32px] font-medium text-[#1A1919] mb-4 sm:mb-5">
              Misi Kami
            </h3>
            <div class="space-y-3 sm:space-y-4">
              <p class="text-sm sm:text-base md:text-lg text-[#696969] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus orci vitae ornare ultricies. Vivamus nisl nisi, efficitur a volutpat quis, pulvinar ut erat. Curabitur convallis bibendum elementum. Nulla facilisi. Nullam ultrices, enim ac volutpat hendrerit, lorem dolor efficitur sem, in malesuada sapien augue quis nunc. Praesent condimentum vehicula mi eget bibendum. Quisque pharetra augue ante, vitae suscipit ex gravida in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Kami Section -->
    <section class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-12.5 py-8 sm:py-12 md:py-15">
      <h2 class="text-lg sm:text-xl font-semibold text-[#E9322B] text-center mb-4 sm:mb-5">
        Brand Kami
      </h2>
      <h3 class="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium text-[#1A1919] text-center mb-2 sm:mb-4 mx-auto">
        Rangkaian Brand untuk Beragam Kebutuhan Furnitur
      </h3>
      <div class="mx-auto space-y-2 sm:space-y-3 mb-10">
        <p class="text-sm sm:text-base md:text-lg text-[#696969] text-center leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus orci vitae ornare ultricies. Vivamus nisl nisi, efficitur a volutpat quis, pulvinar ut erat. Curabitur convallis bibendum elementum. Nulla facilisi. Nullam ultrices, enim ac volutpat hendrerit, lorem dolor efficitur sem, in malesuada sapien augue quis nunc. Praesent condimentum vehicula mi eget bibendum. Quisque pharetra augue ante, vitae suscipit ex gravida in.
        </p>
      </div>

      <!-- Brand Logos -->
      <div class="flex flex-row gap-4 justify-center items-center mx-auto">
        <NuxtImg
          v-if="logoUrl"
          :src="logoUrl"
          :alt="`${appName} Logo`"
          class="w-auto h-[70px] object-contain"
          fit="contain"
        />
        <span v-if="appName" class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A1919]">
          {{ appName }}
        </span>
      </div>
    </section>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
const { appName, logoUrl } = useAppIdentity();

definePageMeta({
  layout: "default",
});
</script>
