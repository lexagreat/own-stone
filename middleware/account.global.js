export default defineNuxtRouteMiddleware((to) => {
   if (to.path.startsWith("/account")) {
      to.meta.layout = "account";
   }
});
