import SearchBar from "@/components/SearchBar";
import RepositoryList from "@/components/RepositoryList";
import Pagination from "@/components/Pagination";

import { GitHubRepoSearchResponse } from "@/types"
import { buildQueryString } from "@/utils";

async function searchRepositories(query: string, page: number, limit: number): Promise<GitHubRepoSearchResponse> {
  if (!query) return { total_count: 0, incomplete_results: false, items: [] };
  const res = await fetch(`https://api.github.com/search/repositories${buildQueryString(query, page, limit)}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return await res.json();
}

type Props = {
  searchParams: { q?: string, page?: string, per_page?: string };
};

export default async function Home({ searchParams }: Props) {
  const { q = '', page: pageParam = '1', per_page: limitParam = '10' } = await searchParams;
  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);
  const repositories = await searchRepositories(q, page, limit);

  return (
    <main className="flex flex-col gap-8 items-center h-full w-9/12">
      <SearchBar query={q} page={page} limit={limit} />
      <RepositoryList items={repositories.items} />
      <Pagination query={q} page={page} limit={limit} total={repositories.total_count}></Pagination>
    </main>
  );
}
