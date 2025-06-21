import RepositoryListItem from "./RepositoryListItem";
import type { GitHubRepoItem } from "@/types";

type Props = {
  items?: GitHubRepoItem[];
}
export default function RepositoryList({ items }: Props) {
  return (
    <div className="w-full grid gap-4 grid-cols-1">
      {items?.map((item) => (
        <RepositoryListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
