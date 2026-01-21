"use client"

import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { label: "전체", value: "all" },
  { label: "기술", value: "tech" },
  { label: "일상", value: "life" },
]

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("category") ?? "all"

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    const query = params.toString()
    router.push(query ? `/posts?${query}` : "/posts")
  }

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="category" className="text-sm font-medium text-neutral-700">
        카테고리
      </label>
      <select
        id="category"
        value={current}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-full border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}
