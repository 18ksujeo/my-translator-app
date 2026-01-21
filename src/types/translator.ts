export type LanguageCode = "ko" | "en"

export type TranslationResult = {
  source: LanguageCode
  target: LanguageCode
  input: string
  output: string
}
