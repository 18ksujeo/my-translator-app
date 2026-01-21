import { NextResponse } from "next/server"

import { getErrorMessage } from "@/lib/supabase/error-handler"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "로그인이 필요합니다", code: "UNAUTHORIZED" },
        { status: 401 }
      )
    }

    const body = (await request.json()) as { title?: string; content?: string | null }
    const title = body.title?.trim()

    if (!title) {
      return NextResponse.json(
        { success: false, error: "제목을 입력해 주세요", code: "INVALID_INPUT" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        content: body.content ?? null,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: getErrorMessage(error), code: error.code ?? null },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("POST /api/posts error:", error)
    return NextResponse.json(
      { success: false, error: "오류가 발생했습니다. 잠시 후 다시 시도해주세요", code: "INTERNAL_ERROR" },
      { status: 500 }
    )
  }
}
