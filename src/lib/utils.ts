import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImagePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Ensure path starts with / if not present (optional safety)
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
