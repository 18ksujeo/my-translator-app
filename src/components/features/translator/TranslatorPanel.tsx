"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LanguageCode, TranslationResult } from "@/types/translator"

const detectLanguage = (text: string): LanguageCode => {
  if (/[가-힣]/.test(text)) {
    return "ko"
  }
  return "en"
}

const mockTranslate = (text: string, source: LanguageCode): TranslationResult => {
  const target = source === "ko" ? "en" : "ko"
  const prefix = target === "ko" ? "한국어 번역" : "영어 번역"
  return {
    source,
    target,
    input: text,
    output: text ? `${prefix}: ${text}` : "",
  }
}

export default function TranslatorPanel() {
  const [input, setInput] = useState("")

  const result = useMemo(() => {
    const source = detectLanguage(input)
    return mockTranslate(input, source)
  }, [input])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-black/10">
        <CardHeader>
          <CardTitle className="text-lg">원문 입력</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="min-h-[200px] w-full resize-none rounded-xl border border-black/10 bg-white p-4 text-sm text-neutral-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="영어 또는 한국어로 입력해 주세요."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
            <span>자동 감지: {result.source === "ko" ? "한국어" : "영어"}</span>
            <Button variant="outline" size="sm" onClick={() => setInput("")}>
              비우기
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-black/10">
        <CardHeader>
          <CardTitle className="text-lg">번역 결과</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[200px] rounded-xl border border-black/10 bg-neutral-50 p-4 text-sm text-neutral-700">
            {result.output || "번역 결과가 여기에 표시됩니다."}
          </div>
          <div className="text-xs text-neutral-500">
            대상 언어: {result.target === "ko" ? "한국어" : "영어"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
