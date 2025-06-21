'use client'
import Link from 'next/link';
import { buildQueryString } from '@/utils';
import { MAX_COUNT } from '@/types';

type Props = {
  query: string;
  page: number;
  limit: number;
  total: number;
}

export default function Pagination({ query, page, limit, total }: Props) {
  if (total === 0) return null;

  const totalPages = total > MAX_COUNT ? Math.ceil(MAX_COUNT / limit) : Math.ceil(total / limit);

  const prevPageLink = page > 1 ? buildQueryString(query, page - 1, limit) : '';
  const nextPageLink = totalPages > page ? buildQueryString(query, page + 1, limit) : '';

  return (
    <div className="w-full flex justify-center items-center mt-4 space-x-4 pb-20">
      {prevPageLink ?
        <Link href={prevPageLink} className="btn btn-neutral join-item ">
          前のページ</Link>
        :
        <div className="btn btn-disabled join-item ">
          前のページ</div>}
      <span className="join-item">{page} / {totalPages}</span>
      {nextPageLink ?
        <Link href={nextPageLink} className="btn btn-neutral join-item ">
          次のページ</Link>
        :
        <div className="btn btn-disabled join-item ">次のページ</div>}
    </div>
  )
}
