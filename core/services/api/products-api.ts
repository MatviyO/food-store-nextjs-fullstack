import { Product } from '@prisma/client';
import { axiosInstance } from "@/core/services/api/axios";
import { ApiUrl } from "@/core/services/api/ApiConfig";

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(ApiUrl.search, { params: { query } });

  return data;
};
