import { PostHog } from "posthog-node";
import { cyrb53 } from "~/utils/hash";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headers = getRequestHeaders(event);
  const ip = headers["x-forwarded-for"]?.split(",")[0] || "0.0.0.0";
  const userAgent = headers["user-agent"] || "";
  const distinctId = cyrb53(ip + userAgent).toString();
  const variant = getCookie(event, "funnel_variant");

  const runtimeConfig = useRuntimeConfig();
  const posthog = new PostHog(runtimeConfig.public.posthogPublicKey, {
    host: runtimeConfig.public.posthogHost,
    flushAt: 1,
    flushInterval: 0,
  });

  try {
    await posthog.capture({
      distinctId,
      event: body.event,
      properties: {
        ...body.properties,
        user_agent: userAgent,
        variant,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("PostHog tracking failed:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to track event",
    });
  } finally {
    await posthog.shutdown();
  }
});
