<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
      <Toast />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { appName, loadAppIdentity } = useAppIdentity();

await loadAppIdentity();

useHead(() => ({
  titleTemplate: (titleChunk) => {
    if (!titleChunk) {
      return appName.value || "";
    }

    if (!appName.value) {
      return titleChunk;
    }

    return `${titleChunk} - ${appName.value}`;
  },
  meta: [
    {
      key: "description",
      name: "description",
      content: appName.value ? `${appName.value} - Toko Online Terpercaya` : "",
    },
    {
      key: "og:site_name",
      property: "og:site_name",
      content: appName.value || "",
    },
  ],
}));
</script>

<style>
</style>
