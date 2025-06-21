import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/utils", () => ({
  buildQueryString: vi.fn((query: string, page: number, limit: number) => {
    return `?q=${query}&sort=stars&order=desc&page=${page}&per_page=${limit}`;
  }),
}));

describe("SearchBar", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
  });

  it("初期値を正しく表示すること", () => {
    render(<SearchBar query="initial query" page={1} limit={10} />);

    const input = screen.getByPlaceholderText("リポジトリ名を入力してください");
    expect(input).toHaveValue("initial query");
  });

  it("検索ボタンをクリックすると検索を実行すること", () => {
    render(<SearchBar query="" page={1} limit={10} />);

    const input = screen.getByPlaceholderText("リポジトリ名を入力してください");
    const button = screen.getByText("検索");

    fireEvent.change(input, { target: { value: "test-repo" } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith(
      "?q=test-repo&sort=stars&order=desc&page=1&per_page=10",
    );
  });

  it("Enterキーを押すと検索を実行すること", () => {
    render(<SearchBar query="" page={1} limit={10} />);

    const input = screen.getByPlaceholderText("リポジトリ名を入力してください");

    fireEvent.change(input, { target: { value: "enter-test" } });
    fireEvent.keyUp(input, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith(
      "?q=enter-test&sort=stars&order=desc&page=1&per_page=10",
    );
  });

  it("正しいCSSクラスが適用されること", () => {
    const { container } = render(<SearchBar query="" page={1} limit={10} />);

    const joinContainer = container.querySelector(".join");
    expect(joinContainer).toBeInTheDocument();

    const inputContainer = container.querySelector(
      ".input.validator.join-item.sm\\:w-md",
    );
    expect(inputContainer).toBeInTheDocument();

    const button = screen.getByText("検索");
    expect(button).toHaveClass("btn", "btn-neutral", "join-item");
  });

  it("入力フィールドにrequired属性が設定されること", () => {
    render(<SearchBar query="" page={1} limit={10} />);

    const input = screen.getByPlaceholderText("リポジトリ名を入力してください");
    expect(input).toHaveAttribute("required");
  });

  it("異なるページとリミットで正しいクエリ文字列を生成すること", () => {
    render(<SearchBar query="" page={5} limit={50} />);

    const input = screen.getByPlaceholderText("リポジトリ名を入力してください");
    const button = screen.getByText("検索");

    fireEvent.change(input, { target: { value: "pagination-test" } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith(
      "?q=pagination-test&sort=stars&order=desc&page=5&per_page=50",
    );
  });
});

