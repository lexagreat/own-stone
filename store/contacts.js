export const useContacts = defineStore("useContacts", {
   state: () => ({
      info: null,
   }),
   actions: {
      async getInfo() {
         let { data } = await useBaseFetch("/contactspage");
         this.info = data;
      },
   },
});
