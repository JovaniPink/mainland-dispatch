"use client";

import { useCallback, useSyncExternalStore } from "react";
import { encodeSavedTarget, type SavedTarget } from "./saved-target";

const KEY = "md-saved";
const CHANGE_EVENT = "md-saved-change";
const EMPTY: { saved: string[]; error: string; readable: boolean } = {
  saved: [],
  error: "",
  readable: true,
};
let snapshot = EMPTY;
let cachedRaw: string | null | undefined;

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return snapshot;
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) throw new Error("Invalid collection");
    cachedRaw = raw;
    snapshot = {
      saved: [
        ...new Set(
          parsed.filter((value): value is string => typeof value === "string")
        ),
      ],
      error: "",
      readable: true,
    };
  } catch {
    cachedRaw = undefined;
    const error =
      "Your saved collection could not be read. Browser storage may be unavailable or its data damaged.";
    if (snapshot.error !== error)
      snapshot = { saved: [], error, readable: false };
  }
  return snapshot;
}
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
function write(ids: string[]) {
  try {
    const raw = JSON.stringify(ids);
    localStorage.setItem(KEY, raw);
    cachedRaw = raw;
    snapshot = { saved: ids, error: "", readable: true };
  } catch {
    snapshot = {
      ...snapshot,
      error:
        "Your change could not be saved. Browser storage may be unavailable or full.",
    };
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Persist references only. Public selectors decide what can be displayed. */
export function useSaved() {
  const state = useSyncExternalStore(subscribe, read, () => EMPTY);
  const toggle = useCallback((target: string | SavedTarget) => {
    const id = typeof target === "string" ? target : encodeSavedTarget(target);
    const current = read();
    if (!current.readable) {
      window.dispatchEvent(new Event(CHANGE_EVENT));
      return;
    }
    write(
      current.saved.includes(id)
        ? current.saved.filter((value) => value !== id)
        : [...current.saved, id]
    );
  }, []);
  const isSaved = useCallback(
    (target: string | SavedTarget) =>
      state.saved.includes(
        typeof target === "string" ? target : encodeSavedTarget(target)
      ),
    [state.saved]
  );
  return { ...state, toggle, isSaved };
}
