export const useContacts = defineStore("useContacts", {
   state: () => ({
      info: null,
      consultIcon: null,
      leadMagnit: null,
   }),
   actions: {
      async getInfo() {
         let { data } = await useBaseFetch("/contactspage");
         this.info = data;
      },
      async getConsultIcon() {
         let { data } = await useBaseFetch("/ikonka-konsultanta?populate=*");
         this.consultIcon = data;
      },
      async getLeadMagnit() {
         let { data } = await useBaseFetch("/lid-magnit?populate=*");

         this.leadMagnit = data;
      },
   },
});
