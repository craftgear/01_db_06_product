export const buildQueryString = (
  query: string,
  page: number,
  limit: number,
) => {
  if (query.trim() === "") {
    throw new Error("検索文字列がありません");
  }
  return `?q=${query}&sort=stars&order=desc&page=${page}&per_page=${limit}`;
};
