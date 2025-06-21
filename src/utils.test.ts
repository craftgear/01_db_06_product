import { describe, it, expect } from "vitest";
import { buildQueryString } from "./utils";

describe("buildQueryString", () => {
  it("クエリパラメータを作ること", () => {
    const result = buildQueryString("test", 1, 10);
    expect(result).toBe("?q=test&sort=stars&order=desc&page=1&per_page=10");
  });

  it("空文字列が渡された場合例外を投げること", () => {
    expect(() => buildQueryString("", 1, 10)).toThrow("検索文字列がありません");
  });
});
