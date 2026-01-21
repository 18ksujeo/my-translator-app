import TranslatorPanel from "@/components/features/translator/TranslatorPanel"

export default function TranslatePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            영한 번역기
          </p>
          <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            한 화면에서 바로 번역되는 실시간 번역 경험
          </h1>
          <p className="max-w-2xl text-sm text-neutral-600 sm:text-base">
            영어와 한국어를 모두 지원하는 번역 화면입니다. 왼쪽에 입력하면 오른쪽에
            즉시 번역 결과가 표시됩니다.
          </p>
        </div>
        <TranslatorPanel />
      </div>
    </div>
  )
}
