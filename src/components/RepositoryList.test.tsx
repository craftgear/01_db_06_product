import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RepositoryList from "./RepositoryList";
import type { GitHubRepoItem } from "@/types";

describe("RepositoryList", () => {
  const mockItems: GitHubRepoItem[] = [
    {
      id: 1,
      node_id: "node1",
      name: "test-repo-1",
      full_name: "user/test-repo-1",
      private: false,
      owner: {
        login: "testuser1",
        id: 1,
        avatar_url: "https://example.com/avatar1.jpg",
        html_url: "https://github.com/testuser1",
      },
      html_url: "https://github.com/user/test-repo-1",
      description: "Test repository 1",
      fork: false,
      url: "https://api.github.com/repos/user/test-repo-1",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      pushed_at: "2023-01-02T00:00:00Z",
      homepage: null,
      size: 100,
      stargazers_count: 10,
      watchers_count: 5,
      language: "TypeScript",
      forks_count: 2,
      open_issues_count: 1,
      license: null,
      topics: [],
      visibility: "public",
      default_branch: "main",
      score: 100,
    },
    {
      id: 2,
      node_id: "node2",
      name: "test-repo-2",
      full_name: "user/test-repo-2",
      private: false,
      owner: {
        login: "testuser2",
        id: 2,
        avatar_url: "https://example.com/avatar2.jpg",
        html_url: "https://github.com/testuser2",
      },
      html_url: "https://github.com/user/test-repo-2",
      description: "Test repository 2",
      fork: false,
      url: "https://api.github.com/repos/user/test-repo-2",
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      pushed_at: "2023-01-02T00:00:00Z",
      homepage: null,
      size: 200,
      stargazers_count: 20,
      watchers_count: 10,
      language: "JavaScript",
      forks_count: 4,
      open_issues_count: 2,
      license: null,
      topics: [],
      visibility: "public",
      default_branch: "main",
      score: 200,
    },
  ];

  it("アイテムが提供されていない場合は何も表示されないこと", () => {
    const { container } = render(<RepositoryList items={undefined} />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer?.children).toHaveLength(0);
  });

  it("空の配列が提供された場合は何も表示されないこと", () => {
    const { container } = render(<RepositoryList items={[]} />);
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer?.children).toHaveLength(0);
  });

  it("アイテムが提供された場合、各アイテムを表示すること", () => {
    render(<RepositoryList items={mockItems} />);

    expect(screen.getByText("test-repo-1")).toBeInTheDocument();
    expect(screen.getByText("test-repo-2")).toBeInTheDocument();
  });

  it("正しいグリッドレイアウトクラスが適用されること", () => {
    const { container } = render(<RepositoryList items={mockItems} />);
    const gridContainer = container.firstChild;

    expect(gridContainer).toHaveClass("w-full", "grid", "gap-4", "grid-cols-1");
  });

  it("各アイテムに正しいkeyが設定されること", () => {
    const { container } = render(<RepositoryList items={mockItems} />);
    const items = container.querySelectorAll(".card");

    expect(items).toHaveLength(2);
  });
});

