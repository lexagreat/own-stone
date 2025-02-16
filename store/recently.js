export const useRecently = defineStore("useRecently", {
   state: () => ({
      products: [],
   }),
   actions: {
      add(product) {
         this.products.unshift({
            photos: product.photos,
            date_complete: product?.date_complete,
            apartaments: product?.apartaments,
            id: product?.id,
            name: product?.name,
            address_short: product?.address_short,
            metro_nearby: product?.metro_nearby,
            phone: product?.phone,
            slug: product?.slug,
            tags: product?.tags,
         });
         // this.saveToLS();
      },
      saveToLS() {
         localStorage.recentlyItems = JSON.stringify(this.products);
      },
      getFromLS() {
         if (!localStorage.getItem("recentlyItems")) {
            return;
         }
         this.products = JSON.parse(localStorage.getItem("recentlyItems"));
      },
   },
   getters: {
      PRODUCTS() {
         return Array.from(
            new Map(this.products.map((p) => [p.id, p])).values()
         );
      },
   },
});
