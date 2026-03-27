import type { NewsArticle } from "@/types/news";
import { MOCK_NEWS } from "../mock/news";

export async function getNewsByFirmId(firmId: string): Promise<NewsArticle[]> {
  return MOCK_NEWS.filter((a) => a.firmId === firmId).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getLatestNews(limit = 10): Promise<NewsArticle[]> {
  return [...MOCK_NEWS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
