// HINT: cool bell curve https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
const cyrb53 = (str: string, seed = 0): number => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0) * 4294967296 + (h1 >>> 0);
};

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
