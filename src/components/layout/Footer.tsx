import Link from "next/link"
import { Github, Twitter, Youtube } from "lucide-react"

import site from "@/data/site.json"

const sections = [
  {
    title: "회사 정보",
    links: [
      { label: "회사 소개", href: "#" },
      { label: "채용", href: "#" },
      { label: "블로그", href: "#" },
    ],
  },
  {
    title: "서비스",
    links: [
      { label: "번역 기능", href: "#" },
      { label: "요금제", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "리소스",
    links: [
      { label: "가이드", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "정책", href: "#" },
    ],
  },
  {
    title: "연락처",
    links: [
      { label: "문의하기", href: "#" },
      { label: "지원 센터", href: "#" },
      { label: "파트너십", href: "#" },
    ],
  },
]

const socialLinks = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "YouTube", href: "#", icon: Youtube },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-neutral-300">
                {section.title}
              </p>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link className="text-neutral-200 hover:text-white" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold">{site.name}</p>
            <p className="text-xs text-neutral-400">
              &copy; {year} {site.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-full bg-white/10 p-2 text-neutral-200 transition hover:bg-white/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
