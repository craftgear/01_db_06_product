'use client'

import { useRef } from 'react';
import { useRouter } from 'next/navigation'

import { buildQueryString } from '@/utils';

type Props = { query?: string, page: number, limit: number };

export default function SearchBar({ query, page, limit }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const handleSearch = async (query: string) => {
    router.push(buildQueryString(query, page, limit));
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (!ref.current) return;
    const inputValue = ref.current.value;
    handleSearch?.(inputValue);
  }

  return (
    <div className="join">
      <div>
        <label className="input validator join-item w-md">
          <input onKeyUp={handleKeyPress} ref={ref} className="w-full" type="text" placeholder="リポジトリ名を入力してください" required defaultValue={query} />
        </label>
        <div className="validator-hint hidden">リポジトリ名が入力されていません</div>
      </div>
      <button type="button" className="btn btn-neutral join-item" onClick={handleSubmit}>検索</button>
    </div>
  )
}
