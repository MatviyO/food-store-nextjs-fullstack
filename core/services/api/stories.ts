import { Story, StoryItem } from '@prisma/client';
import { axiosInstance } from "@/core/services/api/axios";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>('/stories');

  return data;
};
