"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import site from "@/data/site.json"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { label: "홈", href: "/" },
  { label: "기능", href: "/translate" },
  { label: "가격", href: "/pricing" },
  { label: "문의", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserEmail(user?.email ?? null)
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUserEmail(null)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAFAD2]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900"
          onClick={() => setIsOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {userEmail ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm text-neutral-700">
                <Avatar className="h-7 w-7 border border-black/10">
                  <AvatarFallback>{userEmail.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="max-w-[160px] truncate">{userEmail}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-50 transition hover:bg-neutral-800"
              >
                회원가입
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-800 hover:bg-black/10 md:hidden"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-black/10 bg-[#FAFAD2] md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium",
                    isActive ? "text-neutral-900" : "text-neutral-700 hover:text-neutral-900"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            {userEmail ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/80 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 border border-black/10">
                    <AvatarFallback>{userEmail.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-[160px] truncate text-sm text-neutral-700">
                    {userEmail}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800"
                  onClick={() => setIsOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-50"
                  onClick={() => setIsOpen(false)}
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
