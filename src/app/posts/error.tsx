"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function PostsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Posts page error:", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h1 className="mt-5 text-xl font-semibold text-neutral-900">
          게시글을 불러오는 중 문제가 발생했어요
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의하세요.
        </p>
        <Button className="mt-6" onClick={reset}>
          다시 시도
        </Button>
      </div>
    </div>
  )
}
