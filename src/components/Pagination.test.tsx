import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Pagination from "./Pagination";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("Pagination", () => {
  const query = "test";
  const total = 100;
  const limit = 10;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRouter as any).mockReset();
  });

  it("最初のページでは前のページボタンが無効になっていること", () => {
    render(<Pagination query={query} page={1} limit={limit} total={total} />);

    const prevButton = screen.getByText("前のページ");
    const nextButton = screen.getByText("次のページ");

    expect(prevButton).toHaveClass("btn", "btn-disabled");
    expect(nextButton.closest("a")).toBeInTheDocument();
    expect(screen.getByText("1 / 10")).toBeInTheDocument();
  });

  it("最後のページでは次のページボタンが無効になっていること", () => {
    const lastPage = Math.ceil(total / limit);
    render(
      <Pagination query={query} page={lastPage} limit={limit} total={total} />,
    );

    const prevButton = screen.getByText("前のページ");
    const nextButton = screen.getByText("次のページ");

    expect(prevButton.closest("a")).toBeInTheDocument();
    expect(nextButton).toHaveClass("btn", "btn-disabled");
    expect(screen.getByText(`${lastPage} / ${lastPage}`)).toBeInTheDocument();
  });

  it("ページ番号を '現在のページ / 総ページ' で表示すること", () => {
    render(<Pagination query={query} page={3} limit={limit} total={total} />);

    expect(screen.getByText("3 / 10")).toBeInTheDocument();
  });

  it("次のページへのリンクが有ること", () => {
    render(<Pagination query={query} page={1} limit={limit} total={total} />);

    const nextLink = screen.getByText("次のページ").closest("a");
    expect(nextLink).toHaveAttribute(
      "href",
      "?q=test&sort=stars&order=desc&page=2&per_page=10",
    );
  });

  it("前のページへのリンクが有ること", () => {
    render(<Pagination query={query} page={2} limit={limit} total={total} />);

    const prevLink = screen.getByText("前のページ").closest("a");
    expect(prevLink).toHaveAttribute(
      "href",
      "?q=test&sort=stars&order=desc&page=1&per_page=10",
    );
  });
});
