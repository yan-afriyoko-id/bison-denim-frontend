<template>
  <section class="px-4 sm:px-6 md:px-[50px] my-8">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-4 md:gap-[20px]">
      <NuxtLink
        v-for="card in cards"
        :key="card.title"
        :to="card.link"
        class="two-images__item relative flex-1 min-h-[280px] sm:min-h-[400px] md:min-h-[650px] flex items-end justify-center overflow-hidden group"
      >
        <img
          :src="card.image"
          :alt="card.title"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
          draggable="false"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="two-images__content relative z-10 text-center text-white px-5 pb-10 sm:pb-[75px] pt-10 sm:pt-[75px]">
          <h3 class="text-lg md:text-xl font-semibold tracking-wide mb-2 uppercase">{{ card.title }}</h3>
          <p v-if="card.description" class="text-sm md:text-base font-medium mb-4 text-white/80 max-w-xs mx-auto">{{ card.description }}</p>
          <span class="link-underline-anim text-white text-sm font-medium">
            {{ card.linkText }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    title: 'Long Wallet',
    description: '',
    link: '/products?category_ids=50',
    linkText: 'Shop Now',
    image: '/assets/img/collections/long-wallet.jpg',
  },
  {
    title: 'Short Wallet',
    description: '',
    link: '/products?category_ids=51',
    linkText: 'Discover The Collection',
    image: '/assets/img/collections/short-wallet.jpg',
  },
]
</script>

<style scoped>
.two-images__item {
  flex: 1 1 auto;
}
</style>
