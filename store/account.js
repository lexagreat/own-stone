export const useAside = defineStore("useAside", {
   state: () => ({
      isAside: false,
   }),
   actions: {
      closeAside() {
         this.isAside = false;
      },
      openAside() {
         this.isAside = true;
      },
   },
});
