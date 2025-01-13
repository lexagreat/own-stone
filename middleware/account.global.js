import { useAccount } from "~/store/account";

export default defineNuxtRouteMiddleware(async (to) => {
   if (to.path.startsWith("/account")) {
      to.meta.layout = "account";
      const store = useAccount();

      // Если выполняется на клиенте
      if (process.client) {
         if (!store.user) {
            await store.init(); // Дождаться завершения инициализации

            // Если пользователь не авторизован, перенаправить на главную
            if (!store.user) {
               return navigateTo("/"); // Редирект на главную
            }
         }
      }
   }
});
