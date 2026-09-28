export type Result<T> = { ok: true; value: T } | { ok: false; message: string };
export function explain(result: Result<number>): string {
  return result.ok ? `Value: ${result.value}` : `Error: ${result.message}`;
}
