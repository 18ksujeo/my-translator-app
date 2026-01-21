import type { PostgrestError } from "@supabase/supabase-js"

const ERROR_MESSAGES: Record<string, string> = {
  "42501": "이 작업을 수행할 권한이 없습니다",
  PGRST116: "요청한 데이터를 찾을 수 없습니다",
  "23505": "이미 존재하는 데이터입니다",
  "23503": "연결된 데이터가 존재하지 않습니다",
}

export function getErrorMessage(error: PostgrestError): string {
  return ERROR_MESSAGES[error.code ?? ""] ?? "오류가 발생했습니다. 잠시 후 다시 시도해주세요"
}

export function handleSupabaseError(error: PostgrestError | null | undefined) {
  if (!error) {
    return { success: true, error: null, code: null }
  }

  return {
    success: false,
    error: getErrorMessage(error),
    code: error.code ?? null,
  }
}
