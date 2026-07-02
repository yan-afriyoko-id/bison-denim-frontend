<template>
  <div class="bg-black text-white text-center text-xs sm:text-sm overflow-hidden h-10 relative z-10">
    <div class="relative h-full flex items-center justify-center">
      <TransitionGroup tag="div" name="announce-fade" class="absolute inset-0 flex items-center justify-center">
        <div
          v-for="(item, index) in items"
          v-show="index === current"
          :key="item.text"
          class="absolute inset-0 flex items-center justify-center gap-1.5 px-4"
        >
          <span>{{ item.text }}</span>
          <NuxtLink
            v-if="item.link"
            :to="item.link"
            class="link-underline-anim text-white/90 hover:text-white underline-offset-2 font-medium"
          >
            {{ item.linkText }}
          </NuxtLink>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const items = [
  { text: 'Enjoy Up to 50% Off On Selected Products.', link: '/collections/limited-time', linkText: 'Shop Now' },
  { text: 'Member Exclusive: Enjoy 10% Off All Full-Priced Finds —', link: '/account/register', linkText: 'Sign Up Now!' },
  { text: 'Enjoy a 50,000 IDR shipping rebate on purchases of 2,000,000 IDR or more.', link: '/collections/new-arrival', linkText: 'Shop now' },
]

const current = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    current.value = (current.value + 1) % items.length
  }, 4000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.announce-fade-enter-active,
.announce-fade-leave-active {
  transition: opacity 0.6s ease;
}
.announce-fade-enter-from,
.announce-fade-leave-to {
  opacity: 0;
}
</style>
