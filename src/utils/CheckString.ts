export function isNullOrWhiteSpace(input: string | null | undefined): boolean {
  return !input || input.trim().length === 0;
}