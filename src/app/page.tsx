import Image from "next/image"

import site from "@/data/site.json"

const features = [
  {
    title: "양방향 번역",
    description: "영어에서 한국어, 한국어에서 영어까지 매끄럽게 변환합니다.",
  },
  {
    title: "문맥 완벽 보정",
    description: "문장 구조와 뉘앙스를 살려 자연스럽게 번역합니다.",
  },
  {
    title: "전문 용어 지원",
    description: "비즈니스와 기술 문맥에 맞는 단어를 선택합니다.",
  },
]

export default function Home() {
  return (
    <div className="bg-[#FAFAD2]/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              {site.name}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl">
              영문과 국문을 완벽히 연결하는 번역 파트너
            </h1>
            <p className="max-w-xl text-base text-neutral-700 sm:text-lg">
              영한 번역 서비스를 제공해 정확한 의미와 뉘앙스를 놓치지 않습니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
                시작하기
              </button>
              <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50">
                더 알아보기
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-indigo-200/60 blur-2xl" />
            <div className="absolute -bottom-10 right-8 h-28 w-28 rounded-full bg-emerald-200/60 blur-2xl" />
            <Image
              src="/images/hero-illustration.svg"
              alt="Translation illustration"
              width={520}
              height={420}
              className="relative w-full rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
              priority
            />
          </div>
        </section>

        <section className="space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              핵심 기능
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900">
              번역에 필요한 모든 것을 한곳에서
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <span className="text-xl font-semibold">A</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-black/10 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <h2 className="text-3xl font-semibold text-neutral-900">
            지금 바로 번역 품질을 체감해보세요
          </h2>
          <p className="mt-3 text-sm text-neutral-600 sm:text-base">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
              회원가입하기
            </button>
            <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50">
              데모 보기
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
