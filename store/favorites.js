export const useFavorites = defineStore("useFavorites", {
   state: () => ({
      build: {
         projects: [],
         apartaments: [],
      },
      secondary: [],
      commerce: {
         projects: [],
         apartaments: [],
      },
   }),
   actions: {
      // add(product, cat) {
      //    console.log("adding to favor", product);
      // },
      remove(productSlug, arr) {
         return arr.filter((item) => item.slug !== productSlug);
      },
      isContains(productSlug, arr) {
         return arr.some((item) => item.slug == productSlug);
      },
      toggle(product) {
         if (product?.type_apartaments) {
            // projects
            if (product?.type_apartaments == "project") {
               if (this.isContains(product?.slug, this.build.projects)) {
                  // console.log("удалили товар");
                  this.build.projects = this.remove(
                     product?.slug,
                     this.build.projects
                  );
               } else {
                  // console.log("Добавили товар");
                  this.build.projects.push(product);
               }
            } else {
               if (this.isContains(product?.slug, this.commerce.projects)) {
                  // console.log("удалили товар");
                  this.commerce.projects = this.remove(
                     product?.slug,
                     this.commerce.projects
                  );
               } else {
                  // console.log("Добавили товар");
                  this.commerce.projects.push(product);
               }
            }
         } else {
            // apartaments
            if (product?.type_apartaments == "project") {
               if (this.isContains(product?.slug, this.build.apartaments)) {
                  // console.log("удалили товар");
                  this.build.apartaments = this.remove(
                     product?.slug,
                     this.build.apartaments
                  );
               } else {
                  // console.log("Добавили товар");
                  this.build.apartaments.push(product);
               }
            } else if (product.type_aparts == "Вторичная") {
               if (this.isContains(product?.slug, this.secondary)) {
                  // console.log("удалили товар");
                  this.secondary = this.remove(product?.slug, this.secondary);
               } else {
                  // console.log("Добавили товар");
                  this.secondary.push(product);
               }
            } else {
               if (this.isContains(product?.slug, this.commerce.apartaments)) {
                  // console.log("удалили товар");
                  this.commerce.apartaments = this.remove(
                     product?.slug,
                     this.commerce.apartaments
                  );
               } else {
                  // console.log("Добавили товар");
                  this.commerce.apartaments.push(product);
               }
            }
         }
         this.saveToLS();
      },
      saveToLS() {
         localStorage.setItem(
            "favorites",
            JSON.stringify({
               build: this.build,
               secondary: this.secondary,
               commerce: this.commerce,
            })
         );
      },
      getFromLS() {
         if (!localStorage.getItem("favorites")) {
            return;
         }
         this.build = JSON.parse(localStorage.getItem("favorites"))?.build;
         this.secondary = JSON.parse(
            localStorage.getItem("favorites")
         )?.secondary;
         this.commerce = JSON.parse(
            localStorage.getItem("favorites")
         )?.commerce;
      },
   },
});
