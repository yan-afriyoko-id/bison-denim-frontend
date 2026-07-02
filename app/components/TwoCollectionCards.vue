<template>
  <section class="px-4 sm:px-6 md:px-[50px] my-8">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-0 md:gap-[20px]">
      <div
        v-for="card in cards"
        :key="card.title"
        class="two-images__item relative flex-1 min-h-[400px] md:min-h-[650px] bg-cover bg-center flex items-end justify-center overflow-hidden"
        :style="{ backgroundImage: `url(${card.image})` }"
      >
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="two-images__content relative z-10 text-center text-white px-5 pb-[75px] pt-[75px]">
          <h3 class="text-lg md:text-xl font-semibold tracking-wide mb-2 uppercase">{{ card.title }}</h3>
          <p v-if="card.description" class="text-sm md:text-base font-medium mb-4 text-white/80 max-w-xs mx-auto">{{ card.description }}</p>
          <NuxtLink
            :to="card.link"
            class="link-underline-anim text-white text-sm font-medium"
          >
            {{ card.linkText }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    title: 'END OF SEASON',
    description: '',
    link: '/collections/limited-time',
    linkText: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
  },
  {
    title: 'MAGNETIC CARD HOLDER',
    description: '',
    link: '/collections/magsafe',
    linkText: 'Discover The Collection',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  },
]
</script>

<style scoped>
.two-images__item {
  flex: 1 1 auto;
}
</style>
