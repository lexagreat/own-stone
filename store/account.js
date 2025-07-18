export const useAccount = defineStore("useAccount", {
   state: () => ({
      isAside: false,
      user: null,
      faq: [],
      token: "",
      time: 0,
   }),
   actions: {
      closeAside() {
         this.isAside = false;
      },
      openAside() {
         this.isAside = true;
      },
      async getCode(phone, object) {
         let response = await useBaseFetch(
            `/profile?type=${object.type}&phone=${phone}&firstname=${object.firstname}&secondname=${object.secondname}&email=${object.email}&user_avctivity=${object.user_avctivity}`
         );
         return response;
      },
      async sendCode(phone, code) {
         let response = await useBaseFetch(
            `/profile?type=confirm_code&phone=${phone}&code=${code}`
         );
         if (response?.status) {
            this.saveToken(response.data.token);
            await this.getMeInfo();
            await this.getFaq();
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
            if (this.user?.clients?.length > 1) {
               this.user.clients = this.user.clients.filter(
                  (item, index, self) =>
                     index ===
                     self.findIndex((t) => t?.documentId === item?.documentId)
               );
            }
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
            // console.log("new user", response.responseupdate.data);
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
         if (this.user.clients?.length > 1) {
            this.user.clients = this.user.clients.filter(
               (item, index, self) =>
                  index ===
                  self.findIndex((t) => t?.documentId === item?.documentId)
            );
         }
         return response;
      },
      async sendForm(obj) {
         const btn = document.querySelector(".modal.open .btn");
         if (btn) {
            btn.classList.add("disabled");
         }
         // document
         //    .querySelectorAll(".modal .btn")
         //    .forEach((btn) => btn.classList.add("disabled"));
         let response = await useBaseFetch("/mailsender", {
            method: "POST",
            body: objectToFormData(obj),
         });
         if (btn) {
            btn.classList.remove("disabled");
         }
         // document
         //    .querySelectorAll(".modal .btn")
         //    .forEach((btn) => btn.classList.remove("disabled"));

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
