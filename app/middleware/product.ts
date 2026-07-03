export default defineNuxtRouteMiddleware(async (to) => {
  const slug = to.params.id as string

  if (!slug) {
    throw createError({
      statusCode: 404,
      statusMessage: "Produk tidak ditemukan",
      message: "Produk tidak ditemukan",
      fatal: true,
    })
  }

  const productFetchCache = useState<{
    slug: string
    response: {
      data: any
      error: any
    }
  } | null>("product:route-cache", () => null)

  if (productFetchCache.value?.slug === slug) {
    const cachedError = productFetchCache.value.response.error
    const cachedStatusCode =
      cachedError?.statusCode ||
      cachedError?.status ||
      cachedError?.response?.status ||
      cachedError?.data?.statusCode

    if (cachedStatusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: "Produk tidak ditemukan",
        message: "Produk tidak ditemukan",
        fatal: true,
      })
    }

    return
  }

  const { getProduct } = useProductApi()
  const response = await getProduct(slug)

  productFetchCache.value = {
    slug,
    response,
  }

  const statusCode =
    response.error?.statusCode ||
    response.error?.status ||
    response.error?.response?.status ||
    response.error?.data?.statusCode

  if (statusCode === 404) {
    throw createError({
      statusCode: 404,
      statusMessage: "Produk tidak ditemukan",
      message: "Produk tidak ditemukan",
      fatal: true,
    })
  }
})
