export const useAccount = defineStore("useAccount", {
   state: () => ({
      isAside: false,
      user: null,
      token: "",
   }),
   actions: {
      closeAside() {
         this.isAside = false;
      },
      openAside() {
         this.isAside = true;
      },
      async getCode(phone) {
         let response = await useBaseFetch(`/profile?type=auth&phone=${phone}`);
         return response;
      },
      async sendCode(phone, code) {
         let response = await useBaseFetch(
            `/profile?type=confirm_code&phone=${phone}&code=${code}`
         );
         if (response?.status) {
            this.saveToken(response.data.token);
            await this.getMeInfo();
         }
         return response;
      },
      saveToken(token) {
         localStorage.token = token;
         this.token = token;
      },
      removeToken() {
         localStorage.token = "";
         this.token = "";
      },
      exit() {
         this.removeToken();
         this.user = null;
      },
      async getMeInfo() {
         let response = await useBaseFetch("/users/me?pLevel=3", {
            headers: {
               // Исправлено на headers
               "Content-Type": "application/json", // Указываем тип контента
               Authorization: "Bearer " + this.token, // Исправлено на Authorization
            },
         });
         console.log(response);
         if (response?.id) {
            console.log("автоирзованы", response);
            this.user = response;
         }
         return response;
      },
      async init() {
         if (localStorage.token) {
            this.saveToken(localStorage.token);
            await this.getMeInfo();
         }
      },
   },
});
