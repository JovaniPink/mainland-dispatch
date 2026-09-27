import { notFound } from "next/navigation";

export function requireEditorialDesk() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_EDITORIAL_DESK !== "1"
  ) {
    notFound();
  }
}
