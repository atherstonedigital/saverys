import fs from "fs";
import path from "path";

export function getPageContent<T>(page: string): T {
  const filePath = path.join(process.cwd(), "content", "pages", `${page}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getSettings<T>(): T {
  const filePath = path.join(process.cwd(), "content", "settings", "general.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}
