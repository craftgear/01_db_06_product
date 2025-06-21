
export const MAX_COUNT = 1000;

export type GitHubRepoOwner = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export type GitHubRepoItem = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubRepoOwner;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    url: string | null;
  } | null;
  topics: string[];
  visibility: 'public' | 'private';
  default_branch: string;
  score: number;
}

export type GitHubRepoSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoItem[];
}
