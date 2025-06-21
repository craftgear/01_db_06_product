import SearchBar from "@/components/SearchBar";
import RepositoryList from "@/components/RepositoryList";

import { GitHubRepoSearchResponse } from "@/types"


async function searchRepositories(query: string): Promise<GitHubRepoSearchResponse> {
  if (!query) return { total_count: 0, incomplete_results: false, items: [] };
  const res = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return await res.json();
}

type Props = {
  searchParams: { query?: string };
};

export default async function Home({ searchParams }: Props) {
  const { query = '' } = await searchParams;
  const repositories = await searchRepositories(query);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center  h-full w-full">
        <SearchBar />
        <RepositoryList items={repositories.items} />
      </main>
    </div>
  );
}
