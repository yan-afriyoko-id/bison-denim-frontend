export interface MainBanner {
  id: number;
  uuid?: string;
  title: string | null;
  image: string;
  link_url: string | null;
  sort_order: number;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
}

export interface PublicMainBannersResponse {
  success: boolean;
  data: MainBanner[] | { banners: MainBanner[] };
  message?: string;
}
