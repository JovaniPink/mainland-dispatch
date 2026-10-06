export type SavedTarget = { kind: "dispatch" | "notebook"; id: string };
export function encodeSavedTarget(target: SavedTarget): string {
  return target.kind === "notebook" ? `notebook:${target.id}` : target.id;
}
export function decodeSavedTarget(value: string): SavedTarget | undefined {
  if (value.startsWith("notebook:"))
    return { kind: "notebook", id: value.slice(9) };
  if (value.startsWith("d-")) return { kind: "dispatch", id: value };
}
