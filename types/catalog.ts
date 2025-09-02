export interface IProjectCard {
  sortOrder: string;
  id: number;
  documentId: string;
  name: string;
  coords: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  date_complete: string;
  developer: string;
  phone: string | null;
  floors_count: number;
  address_string: string;
  description: string;
  tags: string | null;
  address_short: string;
  ring_road: string;
  district: string;
  photos: {
    id: number;
    documentId: string;
    url: string;
  }[];
  metro_nearby: {
    id: number;
    name: string;
    time_foot: string;
    time_car: string | null;
    metro_branch: {
      id: number;
      documentId: string;
      title: string;
      slug: string;
      color_code: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
    };
  }[];
  ap_tags: { id: number; tag: string }[];
  finishing: { id: number; finishing: string }[];
  type_apartaments: 'project';
  count_rooms_structure: { label: string; count: number; minArea: number; minPrice: number }[];
  formatted_rooms: {
    label: string;
    count: number;
    formatted_label: string;
    formatted_area: string;
    formatted_price: string;
    formatted_short_price: string;
  }[];
  area_range: { min: number; max: number };
  price_range: { min: number; max: number };
  formated_price_range: {
    full: string;
    short: string;
    short_extended: string;
  };
}
export interface IApartCard {
  cian_url: null | string;
  id: number;
  documentId: string;
  name_commerce: string | null;
  slug: string;
  square_apartament: number;
  type_aparts: string;
  appointment: string | null;
  cost_total: string;
  cost_total_m2: string;
  count_rooms: string;
  createdAt: string;
  description: string;
  entrance: string | null;
  finishing: string;
  floor: number;
  is_recomend: string | null;
  location: string | null;
  name: string;
  phone: string | null;
  ring_road: string | null;
  photos:
    | {
        id: number;
        documentId: string;
        url: string;
      }[]
    | null;
  ap_tags: string[] | null;
  preview_picture: {
    id: number;
    documentId: string;
    url: string;
  };
  proekty: IProjectCard;
}
