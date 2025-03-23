import { cyrb53 } from "~/utils/hash";

export default defineEventHandler(async (event) => {
  const existingVariant = getCookie(event, "funnel_variant");
  if (existingVariant) {
    const next = getQuery(event).next || "/";
    return sendRedirect(event, next as string);
  }

  const headers = getRequestHeaders(event);
  const ip = headers["x-forwarded-for"]?.split(",")[0] || "0.0.0.0";
  const userAgent = headers["user-agent"] || "";

  // HINT: here testing error config variants
  const variants = ["baseline", "experiment" /*"test_error"*/];

  // HINT: you can use Date.now to generate dynamic hash (otherwise persistant for same ip and useragent)
  // prob could be persistant for any device connecting from the same IP (cool, huh?)
  const hash = cyrb53(ip + userAgent /*+ Date.now()*/);
  const variant = variants[hash % variants.length];

  setCookie(event, "funnel_variant", variant, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: false,
    secure: true,
  });

  const next = getQuery(event).next || "/";
  return sendRedirect(event, next as string);
});
