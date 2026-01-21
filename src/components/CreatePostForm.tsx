"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export default function CreatePostForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setError("로그인이 필요합니다.")
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from("posts").insert({
      title,
      content,
      user_id: user.id,
    })

    if (insertError) {
      setError("게시글 저장에 실패했습니다.")
      setLoading(false)
      return
    }

    setLoading(false)
    router.push("/posts")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-neutral-700">
          제목
        </label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목을 입력하세요"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-neutral-700">
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={6}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="내용을 입력하세요"
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? "저장 중..." : "저장하기"}
      </Button>
    </form>
  )
}
