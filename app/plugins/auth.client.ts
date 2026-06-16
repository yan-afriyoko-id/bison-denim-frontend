export default defineNuxtPlugin(async () => {
  const auth = useAuth()
  
  // Initialize auth on app start to fetch user if token exists
  await auth.initAuth()
})
