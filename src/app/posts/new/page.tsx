import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/server"

export default async function NewPostPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  async function createPost(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login")
    }

    const title = formData.get("title")
    const content = formData.get("content")

    if (typeof title !== "string" || title.trim().length === 0) {
      return
    }

    await supabase.from("posts").insert({
      title: title.trim(),
      content: typeof content === "string" ? content : null,
      user_id: user.id,
    })

    redirect("/posts")
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            New Post
          </p>
          <h1 className="text-2xl font-semibold text-neutral-900">게시글 작성</h1>
          <p className="text-sm text-neutral-500">
            제목과 내용을 입력하면 게시글이 저장됩니다.
          </p>
        </div>

        <form action={createPost} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-neutral-700">
              제목
            </label>
            <Input id="title" name="title" required placeholder="제목을 입력하세요" />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-neutral-700">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="내용을 입력하세요"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">저장하기</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
