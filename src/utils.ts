export const buildQueryString = (query: string, page: number, limit: number) => {
  return `?q=${query}&sort=stars&order=desc&page=${page}&per_page=${limit}`
}
