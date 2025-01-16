export const useAccount = defineStore("useAccount", {
   state: () => ({
      isAside: false,
      user: null,
      faq: [],
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
         if (response?.id) {
            this.user = response;
            this.user.clients = this.user.clients.filter(
               (item, index, self) =>
                  index ===
                  self.findIndex((t) => t.documentId === item.documentId)
            );
         }
         return response;
      },
      async changeData(object) {
         let response = await useBaseFetch("/profile", {
            method: "PUT",
            body: objectToFormData(object),
            headers: {
               // Исправлено на headers
               // "Content-Type": "multipart/form-data", // Указываем тип контента
               Authorization: "Bearer " + this.token, // Исправлено на Authorization
            },
         });
         if (response.status) {
            console.log("new user", response.responseupdate.data);
            await this.getMeInfo();
         }
         return response;
      },
      async getFaq() {
         let response = await useBaseFetch("profiles-faq?pLevel=2", {
            headers: {
               // Исправлено на headers
               "Content-Type": "application/json", // Указываем тип контента
               Authorization: "Bearer " + this.token, // Исправлено на Authorization
            },
         });
         if (response?.data?.id) {
            this.faq = response?.data?.profiles_faq;
         }
         return response;
      },
      async addNewClient(obj) {
         let response = await useBaseFetch("/clients", {
            method: "POST",
            body: objectToFormData(obj),
            headers: {
               // Исправлено на headers
               // "Content-Type": "multipart/form-data", // Указываем тип контента
               Authorization: "Bearer " + this.token, // Исправлено на Authorization
            },
         });
         if (response.status) {
            this.user.clients.push(response.response.data);
         }
         this.user.clients = this.user.clients.filter(
            (item, index, self) =>
               index === self.findIndex((t) => t.documentId === item.documentId)
         );
         return response;
      },
      async sendForm(obj) {
         let response = await useBaseFetch("/mailsender", {
            method: "POST",
            body: objectToFormData(obj),
         });
         return response;
      },
      async init() {
         if (localStorage.token) {
            this.saveToken(localStorage.token);
            await this.getMeInfo();
            await this.getFaq();
         }
      },
   },
});
