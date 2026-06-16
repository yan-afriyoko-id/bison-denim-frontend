import type { PopupBanner } from "~/types/popupBanner";

export const usePopupBannerApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const handleRequest = async <T>(request: Promise<T>) => {
    try {
      const data = await request;
      return { data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: err?.data || {
          message: err?.message || "An error occurred",
          errors: err?.data?.errors || {},
        },
      };
    }
  };

  const getRandomPopupBanner = async () => {
    return handleRequest(
      $fetch<{
        success: boolean;
        data: { popup_banner: PopupBanner | null };
      }>(`${baseURL}/popup-banners/random`, {
        method: "GET",
        headers: getHeaders(),
      }).then((res) => res),
    );
  };

  return {
    getRandomPopupBanner,
  };
};
