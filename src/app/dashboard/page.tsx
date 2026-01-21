import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold text-neutral-900">환영합니다.</h1>
          <p className="text-sm text-neutral-600">현재 로그인한 이메일: {user.email}</p>
        </div>

        <form action="/logout" method="post">
          <Button type="submit" variant="outline">
            로그아웃
          </Button>
        </form>
      </div>
    </div>
  )
}
