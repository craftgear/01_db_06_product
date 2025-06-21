import { ErrorBoundary } from "react-error-boundary";
import SearchBar from "@/components/SearchBar";
import RepositoryList from "@/components/RepositoryList";
import Pagination from "@/components/Pagination";

import { searchRepositories } from "@/api/github";

type Props = {
  searchParams: { q?: string; page?: string; per_page?: string };
};

export default async function Home({ searchParams }: Props) {
  const {
    q = "",
    page: pageParam = "1",
    per_page: limitParam = "10",
  } = await searchParams;

  const page = parseInt(pageParam, 10);
  const limit = parseInt(limitParam, 10);
  const repositories = await searchRepositories(q, page, limit);

  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました、ページを再読込してください。</div>}
    >
      <main className="flex flex-col gap-8 items-center h-full w-9/12">
        <SearchBar query={q} page={page} limit={limit} />
        <RepositoryList items={repositories.items} />
        <Pagination
          query={q}
          page={page}
          limit={limit}
          total={repositories.total_count}
        ></Pagination>
      </main>
    </ErrorBoundary>
  );
}
