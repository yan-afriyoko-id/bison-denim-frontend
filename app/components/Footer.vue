<template>
  <footer class="bg-white text-black border-t border-[#d1d1d1] py-8 sm:py-10 text-[15px]">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px]">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-6 sm:pb-8">
        <div>
          <h4 class="text-[13px] sm:text-[14px] font-medium text-[#898989] uppercase mb-3 sm:mb-4 tracking-normal">
            Subscribe to our Newsletter
          </h4>
          <form class="flex items-end gap-2 max-w-xs">
            <input
              type="email"
              placeholder="Enter your email"
              class="flex-1 min-w-0 py-2 border-0 border-b border-[#ccc] text-[14px] outline-none bg-transparent focus:border-black transition"
            />
            <button
              type="submit"
              class="shrink-0 py-2 px-1 text-[18px] text-black border-0 border-b border-[#ccc] bg-transparent cursor-pointer hover:border-black transition"
              aria-label="Subscribe"
            >
              &rarr;
            </button>
          </form>
        </div>

        <div>
          <h4 class="text-[13px] sm:text-[14px] font-medium text-[#898989] uppercase mb-3 sm:mb-4 tracking-normal">
            Contact Us
          </h4>
          <ul class="list-none p-0 m-0 space-y-1.5">
            <li>
              <a :href="phoneLink" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block break-all">
                {{ footerPhone }}
              </a>
            </li>
            <li>
              <NuxtLink to="/pages/contact-us" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                Send us an email
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[13px] sm:text-[14px] font-medium text-[#898989] uppercase mb-3 sm:mb-4 tracking-normal">
            About
          </h4>
          <ul class="list-none p-0 m-0 space-y-1.5">
            <li>
              <NuxtLink to="/about" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                Our Story
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/store-locations" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                Store Locations
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[13px] sm:text-[14px] font-medium text-[#898989] uppercase mb-3 sm:mb-4 tracking-normal">
            Customer Service
          </h4>
          <ul class="list-none p-0 m-0 space-y-1.5">
            <li>
              <NuxtLink to="/account" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                My Account
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/account/orders" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                Track Your Order
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-[13px] sm:text-[14px] font-medium text-[#898989] uppercase mb-3 sm:mb-4 tracking-normal">
            Legal
          </h4>
          <ul class="list-none p-0 m-0 space-y-1.5">
            <li>
              <NuxtLink to="/privacy-policy" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/disclaimer" class="text-[14px] font-medium text-black leading-snug no-underline hover:underline block">
                Disclaimer
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-[#BCBCBC] pt-5 sm:pt-6">
        <p class="text-[13px] sm:text-[15px] text-[#6b7280] m-0 text-center leading-relaxed">
          &copy; {{ new Date().getFullYear() }} {{ appName || 'Store' }}. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useConfigApi } from "~/composables/useConfigApi";

const { getPublicConfig } = useConfigApi();
const { appName, loadAppIdentity } = useAppIdentity();

const socials = ref<Record<string, string | null>>({});
const footerPhone = ref("+62 21 75922823");

const phoneLink = computed(() => {
  const sanitized = footerPhone.value.replace(/[^\d+]/g, "");
  return `tel:${sanitized}`;
});

const socialLinks = computed(() => {
  const links: { name: string; url: string }[] = []
  if (socials.value.social_facebook) links.push({ name: 'Facebook', url: socials.value.social_facebook })
  if (socials.value.social_instagram) links.push({ name: 'Instagram', url: socials.value.social_instagram })
  if (socials.value.social_tiktok) links.push({ name: 'TikTok', url: socials.value.social_tiktok })
  return links
});

onMounted(async () => {
  await loadAppIdentity();

  const keys = [
    "store_phone",
    "social_instagram",
    "social_tiktok",
    "social_facebook",
  ];

  const results = await Promise.allSettled(
    keys.map((key) => getPublicConfig(key))
  );

  const configMap: Record<string, string | null> = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as string
    const res = results[i] as PromiseSettledResult<any>
    if (res && res.status === "fulfilled") {
      const val = res.value?.data?.data?.value
      configMap[key] = val || null
    } else {
      configMap[key] = null
    }
  }

  if (configMap.store_phone) footerPhone.value = configMap.store_phone;

  socials.value = {
    social_instagram: configMap.social_instagram || null,
    social_tiktok: configMap.social_tiktok || null,
    social_facebook: configMap.social_facebook || null,
  };
});
</script>
