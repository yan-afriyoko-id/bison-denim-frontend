<script setup>
const { toastMsg, toastType } = useToast()
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="toastMsg" 
         class="fixed top-5 right-5 z-[99] px-6 py-3 rounded-lg shadow-lg text-white font-medium"
         :class="toastType === 'success' ? 'bg-emerald-500' : 'bg-rose-500'">
      {{ toastMsg }}
    </div>
  </Transition>
</template>
