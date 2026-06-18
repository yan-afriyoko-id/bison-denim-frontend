export default defineNuxtRouteMiddleware(() => {
  return navigateTo("/account", { redirectCode: 301 });
});
