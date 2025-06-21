'use client'

export default function SearchBar() {
  return (
    <div className="join">
      <div>
        <label className="input validator join-item w-md">
          <input className="w-full" type="email" placeholder="リポジトリ名を入力してください" required />
        </label>
        <div className="validator-hint hidden">リポジトリ名が入力されていません</div>
      </div>
      <button className="btn btn-neutral join-item">検索</button>
    </div>

  )
}
