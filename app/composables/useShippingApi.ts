/**
 * Shipping API composable (RajaOngkir)
 * Handles all shipping-related API calls
 */

// API V2 Format
export interface Province {
  id: number
  name: string
}

export interface City {
  id: number
  name: string
  zip_code: string
}

export interface District {
  id: number
  name: string
  zip_code: string
}

export interface SubDistrict {
  id: number
  name: string
  zip_code: string
}

export interface ShippingCost {
  code: string
  name: string
  costs: Array<{
    service: string
    description: string
    cost: Array<{
      value: number
      etd: string
      note: string
    }>
  }>
}

export interface ProvincesResponse {
  success: boolean
  message: string
  data: Province[]
}

export interface CitiesResponse {
  success: boolean
  message: string
  data: City[]
}

export interface DistrictsResponse {
  success: boolean
  message: string
  data: District[]
}

export interface SubDistrictsResponse {
  success: boolean
  message: string
  data: SubDistrict[]
}

export interface ShippingCostResponse {
  success: boolean
  message: string
  data: ShippingCost[]
}

export const useShippingApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  /**
   * Get all provinces or specific province by ID
   */
  const getProvinces = async (provinceId?: number) => {
    try {
      const params: Record<string, any> = {}
      if (provinceId) {
        params.id = provinceId
      }

      const response = await $fetch<ProvincesResponse>(`${baseURL}/shipping/provinces`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  /**
   * Get cities by province ID or specific city by ID
   */
  const getCities = async (provinceId?: number, cityId?: number) => {
    try {
      const params: Record<string, any> = {}
      if (provinceId) {
        params.province_id = provinceId
      }
      if (cityId) {
        params.id = cityId
      }

      const response = await $fetch<CitiesResponse>(`${baseURL}/shipping/cities`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  /**
   * Get districts by city ID or specific district by ID
   */
  const getDistricts = async (cityId: number, districtId?: number) => {
    try {
      const params: Record<string, any> = {
        city_id: cityId,
      }
      if (districtId) {
        params.id = districtId
      }

      const response = await $fetch<DistrictsResponse>(`${baseURL}/shipping/districts`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  /**
   * Get sub-districts by district ID or specific sub-district by ID
   */
  const getSubDistricts = async (districtId: number, subDistrictId?: number) => {
    try {
      const params: Record<string, any> = {
        district_id: districtId,
      }
      if (subDistrictId) {
        params.id = subDistrictId
      }

      const response = await $fetch<SubDistrictsResponse>(`${baseURL}/shipping/sub-districts`, {
        method: 'GET',
        params,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  const getShippingCost = async (
    destination: number,
    weight: number,
    courier: string = 'jne',
    origin?: number,
    price?: string
  ) => {
    try {
      const body: Record<string, any> = {
        destination,
        weight,
        courier,
      }
      if (origin) {
        body.origin = origin
      }
      if (price) {
        body.price = price
      }

      const response = await $fetch<ShippingCostResponse>(`${baseURL}/shipping/cost`, {
        method: 'POST',
        body,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  return {
    getProvinces,
    getCities,
    getDistricts,
    getSubDistricts,
    getShippingCost,
  }
}
