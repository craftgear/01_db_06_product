import { GitHubRepoSearchResponse, GitHubRepoItem } from "@/types";
import { buildQueryString } from "@/utils";

export async function searchRepositories(
  query: string,
  page: number,
  limit: number,
): Promise<GitHubRepoSearchResponse> {
  if (!query) return { total_count: 0, incomplete_results: false, items: [] };
  const res = await fetch(
    `https://api.github.com/search/repositories${buildQueryString(query, page, limit)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return await res.json();
}

export const fetchRepository = async (
  owner: string,
  name: string,
): Promise<GitHubRepoItem> => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
};
