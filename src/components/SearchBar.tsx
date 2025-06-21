'use client'

import { useRef } from 'react';
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const ref = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const handleSearch = async (query: string) => {
    router.push(`/?query=${encodeURIComponent(query)}`);
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
          <input ref={ref} className="w-full" type="text" placeholder="リポジトリ名を入力してください" required />
        </label>
        <div className="validator-hint hidden">リポジトリ名が入力されていません</div>
      </div>
      <button type="button" className="btn btn-neutral join-item" onClick={handleSubmit}>検索</button>
    </div>
  )
}
