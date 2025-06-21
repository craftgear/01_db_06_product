import Link from "next/link";
import type { GitHubRepoItem } from "@/types";

type Props = {
  item: GitHubRepoItem;
};

export default function RepositoryListItem({ item }: Props) {
  return (
    <Link
      href={`/detail/?owner=${item.owner.login}&name=${item.name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <div className="card rounded-2xl bg-base-100 shadow-sm ">
        <div className="card-body flex flex-col items-center sm:flex-row sm:justify-start sm:space-x-7">
          <div className="avatar">
            <div className="avatar w-24 rounded-full">
              <img src={item.owner.avatar_url} alt={item.owner.html_url} />
            </div>
          </div>
          <h2 className="card-title text-3xl">{item.name}</h2>
        </div>
      </div>
    </Link>
  );
}
