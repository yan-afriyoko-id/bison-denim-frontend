<template>
  <section class="px-4 sm:px-6 md:px-[50px] mt-8 mb-10">
    <div class="max-w-[1440px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="card in cards"
          :key="card.title"
          :to="card.link"
          class="block bg-[#f6f6f4] overflow-hidden group"
        >
          <div class="aspect-[3/4] overflow-hidden">
            <img
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
              loading="lazy"
              draggable="false"
              ondragstart="return false"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    title: 'New Arrivals',
    description: 'Explore the season\'s most coveted pieces, designed to effortlessly elevate your look with stylish verve.',
    cta: 'View More',
    link: '/collections/new-arrival',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&q=80',
  },
  {
    title: "Men's Collection",
    description: 'Thoughtfully made to carry life\'s essentials, these daily staples bring ease and style to commute.',
    cta: 'Shop More',
    link: '/collections/new-arrival-men',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
  },
  {
    title: "Women's Collection",
    description: 'Effortlessly graceful, these everyday bags are made to carry you through every moment.',
    cta: 'Shop More',
    link: '/collections/new-arrival-women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
  },
]
</script>
