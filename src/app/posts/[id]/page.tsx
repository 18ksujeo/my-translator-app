import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

type PostRow = {
  id: string
  title: string
  content: string | null
  created_at: string
  user_id: string
}

type PostPageProps = {
  params: { id: string }
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("id,title,content,created_at,user_id")
    .eq("id", params.id)
    .single()

  if (!data) {
    notFound()
  }

  const post = data as PostRow

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Button asChild variant="outline" className="w-fit">
          <Link href="/posts">목록으로 돌아가기</Link>
        </Button>

        <Card className="border-black/10">
          <CardHeader>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Post Detail
            </p>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-neutral-600">
            <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
              <span>작성일: {new Date(post.created_at).toLocaleDateString("ko-KR")}</span>
              <span>작성자: {post.user_id}</span>
            </div>
            <div className="whitespace-pre-wrap text-sm text-neutral-700">
              {post.content ?? "내용이 없습니다."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
