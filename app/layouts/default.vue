<template>
  <div id="default-layout" class="min-h-screen bg-white font-poppins">
    <slot />
    <LayoutWhatsAppButton />
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
});
</script>

<style scoped>
#default-layout {
  width: 100%;
  min-height: 100vh;
}
</style>
