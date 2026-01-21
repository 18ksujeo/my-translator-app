import CategoryFilter from "@/components/features/posts/CategoryFilter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

type PostRow = {
  id: string
  title: string
  created_at: string
  user_id: string
}

type PostsPageProps = {
  searchParams: { category?: string }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const supabase = await createClient()
  const selectedCategory = searchParams.category
  const categoryFilter =
    selectedCategory === "tech" || selectedCategory === "life" ? selectedCategory : null

  let query = supabase
    .from("posts")
    .select("id,title,created_at,user_id")
    .order("created_at", { ascending: false })

  if (categoryFilter) {
    query = query.eq("category", categoryFilter)
  }

  const { data } = await query

  const posts = (data ?? []) as PostRow[]

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Posts
          </p>
          <h1 className="text-3xl font-semibold text-neutral-900">게시글</h1>
          </div>
          <CategoryFilter />
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-10 text-center text-sm text-neutral-500">
            아직 게시글이 없습니다
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="border-black/10">
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-neutral-600">
                  <div className="flex flex-wrap gap-4">
                    <span>
                      작성일: {new Date(post.created_at).toLocaleDateString("ko-KR")}
                    </span>
                    <span>작성자: {post.user_id}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
