import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import type { GitHubRepoItem } from "@/types";

const fetchRepository = async (
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

type Props = {
  searchParams: { owner: string; name: string };
};

const Stats = ({ name, count }: { name: string; count: number }) => (
  <div className="flex  flex-col items-center space-y-2">
    <div className="text-2xl ">{name}</div>
    <div>{count}</div>
  </div>
);
export default async function Page({ searchParams }: Props) {
  const { owner, name } = await searchParams;
  if (!owner || !name) {
    return (
      <>
        <div>
          {" "}
          {owner}/{name} というリポジトリは見つかりませんでした
        </div>

        <Link href="/">検索画面へ戻る</Link>
      </>
    );
  }

  const repository = await fetchRepository(owner, name);

  return (
    <ErrorBoundary
      fallback={
        <div>エラーが発生しました。ページを再読み込みしてください。</div>
      }
    >
      <div className="container mx-auto p-4 flex flex-col justify-center items-start space-y-8">
        <div className="flex flex-row justify-center items-center space-x-8">
          <div className="avatar">
            <div className="avatar w-24 rounded-full">
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.html_url}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start space-y-4">
            <h2 className="text-3xl">{repository.name}</h2>
            <h2 className="">{repository.language}</h2>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between">
            <Stats name="Star数" count={repository.stargazers_count} />
            <Stats name="Watcher数" count={repository.watchers_count} />
            <Stats name="Fork数" count={repository.forks_count} />
            <Stats name="Issue数" count={repository.open_issues_count} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
