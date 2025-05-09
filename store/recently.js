export const useRecently = defineStore("useRecently", {
   state: () => ({
      slugs: [],
      products: [],
      same: [],
   }),
   actions: {
      add(slug) {
         this.slugs.unshift(slug);
         this.saveToLS();
      },
      saveToLS() {
         localStorage.recentlyItems = JSON.stringify(this.slugs);
      },
      async getFromLS() {
         if (!localStorage.getItem("recentlyItems")) {
            return;
         }
         this.slugs = [
            ...new Set(JSON.parse(localStorage.getItem("recentlyItems"))),
         ];
         await this.getProducts();
      },
      async getProducts() {
         let res = await useBaseFetch("/recently-views", {
            method: "POST",
            body: {
               slugs: this.PRODUCTS,
            },
         });
         // console.log("resently", res.items);
         this.products = res.items;
      },
      async getSameProducts() {
         let res = await useBaseFetch("/for-yous", {
            method: "POST",
            body: {
               slugs: this.PRODUCTS,
            },
         });
         this.same = res.items;
         // console.log("same", res.items);
      },
   },
   getters: {
      PRODUCTS() {
         return [...new Set(this.slugs)];
      },
   },
});
