import { Ingredient } from '@prisma/client';
import { axiosInstance } from "@/core/services/api/axios";
import { ApiUrl } from "@/core/services/api/ApiConfig";

export const getAll = async () => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiUrl.ingredients);

  return data;
};
