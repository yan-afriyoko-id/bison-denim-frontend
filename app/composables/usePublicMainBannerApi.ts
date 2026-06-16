/**
 * Public Main Banner API composable
 * Handles public/main-banners API calls (no auth required)
 */
import type { MainBanner } from "~/types/mainBanner";

export interface PublicMainBannersResponse {
  success: boolean;
  data: MainBanner[] | { banners: MainBanner[] };
  message?: string;
}

export const usePublicMainBannerApi = () => {
  const { baseURL } = useApiBase();

  /**
   * Get all active main banners (public endpoint)
   * @param perPage - 'all' (default) or number for pagination
   */
  const getActiveMainBanners = async (perPage: string | number = "all") => {
    try {
      const response = await $fetch<PublicMainBannersResponse>(
        `${baseURL}/public/main-banners`,
        {
          method: "GET",
          params: {
            per_page: perPage,
          },
        },
      );

      return { response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
          status: error.status,
        },
      };
    }
  };

  return {
    getActiveMainBanners,
  };
};
