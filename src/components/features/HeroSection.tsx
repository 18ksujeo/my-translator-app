import site from "@/data/site.json"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-[#FAFAD2] via-white to-indigo-100 px-6 py-14 sm:px-10">
      <div className="absolute -right-16 -top-24 h-48 w-48 rounded-full bg-indigo-200/60 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-amber-200/60 blur-3xl" />

      <div className="relative z-10 max-w-2xl space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
          {site.name}
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl">
          {site.name}으로 정확하고 자연스러운 번역을 완성하세요
        </h1>
        <p className="text-base leading-7 text-neutral-700 sm:text-lg">
          영문과 국문 사이의 뉘앙스를 세밀하게 살려주는 번역 경험을 제공합니다. 문맥에
          맞는 표현을 추천해 자연스럽고 자신 있게 소통할 수 있습니다.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
            시작하기
          </button>
          <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50">
            자세히 보기
          </button>
        </div>
      </div>
    </section>
  )
}
