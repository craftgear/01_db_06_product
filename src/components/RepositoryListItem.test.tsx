import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RepositoryListItem from "./RepositoryListItem";
import type { GitHubRepoItem } from "@/types";

describe("RepositoryListItem", () => {
  const mockItem: GitHubRepoItem = {
    id: 1,
    node_id: "node1",
    name: "test-repo",
    full_name: "testuser/test-repo",
    private: false,
    owner: {
      login: "testuser",
      id: 1,
      avatar_url: "https://example.com/avatar.jpg",
      html_url: "https://github.com/testuser",
    },
    html_url: "https://github.com/testuser/test-repo",
    description: "Test repository description",
    fork: false,
    url: "https://api.github.com/repos/testuser/test-repo",
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
  };

  it("リポジトリ名を表示すること", () => {
    render(<RepositoryListItem item={mockItem} />);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
  });

  it("オーナーのアバター画像を表示すること", () => {
    render(<RepositoryListItem item={mockItem} />);

    const avatar = screen.getByAltText("https://github.com/testuser");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("正しいリンクURLを生成すること", () => {
    render(<RepositoryListItem item={mockItem} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/detail?owner=testuser&name=test-repo",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("正しいCSSクラスが適用されること", () => {
    render(<RepositoryListItem item={mockItem} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass("no-underline");

    const card = screen.getByRole("heading", { level: 2 }).closest(".card");
    expect(card).toHaveClass("card", "rounded-2xl", "bg-base-100", "shadow-sm");
  });

  it("カードボディに正しいフレックスレイアウトが適用されること", () => {
    render(<RepositoryListItem item={mockItem} />);

    const cardBody = screen
      .getByRole("heading", { level: 2 })
      .closest(".card-body");
    expect(cardBody).toHaveClass(
      "card-body",
      "flex",
      "flex-col",
      "items-center",
      "sm:flex-row",
      "sm:justify-start",
      "sm:space-x-7",
    );
  });

  it("特殊文字を含むリポジトリ名を正しく処理すること", () => {
    const itemWithSpecialName = {
      ...mockItem,
      name: "test-repo-with-特殊文字",
      owner: {
        ...mockItem.owner,
        login: "user-with-ハイフン",
      },
    };

    render(<RepositoryListItem item={itemWithSpecialName} />);

    expect(screen.getByText("test-repo-with-特殊文字")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/detail?owner=user-with-ハイフン&name=test-repo-with-特殊文字",
    );
  });
});

