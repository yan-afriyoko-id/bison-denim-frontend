<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
      <Toast />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_APP_LOGO } from "~/composables/useAppIdentity";

const { appName, loadAppIdentity } = useAppIdentity();
const requestUrl = useRequestURL();
const defaultLogoMetaUrl = computed(
  () => new URL(DEFAULT_APP_LOGO, requestUrl.origin).href,
);

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
    {
      key: "og:image",
      property: "og:image",
      content: defaultLogoMetaUrl.value,
    },
    {
      key: "og:image:secure_url",
      property: "og:image:secure_url",
      content: defaultLogoMetaUrl.value,
    },
    {
      key: "og:image:width",
      property: "og:image:width",
      content: "512",
    },
    {
      key: "og:image:height",
      property: "og:image:height",
      content: "512",
    },
    {
      key: "twitter:image",
      name: "twitter:image",
      content: defaultLogoMetaUrl.value,
    },
    {
      key: "twitter:card",
      name: "twitter:card",
      content: "summary",
    },
  ],
}));
</script>

<style>
</style>
