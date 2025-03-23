export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/decide" || to.path.startsWith("/api/")) {
    return;
  }

  const variant = useCookie("funnel_variant").value;

  if (!variant) {
    const redirectTarget = to.path.startsWith("/s/") ? "/" : to.fullPath;

    return navigateTo(`/api/decide?next=${encodeURIComponent(redirectTarget)}`);
  }
});
