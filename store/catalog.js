export const useCatalog = defineStore("useCatalog", {
   state: () => ({
      products: [],
      meta: {},
   }),
   actions: {
      makeSubStr(string) {
         return string.includes("filters[category]=projects")
            ? "[apartaments]"
            : "";
      },
      async showMore(url) {
         let base = "catalog";
         const response = await useBaseFetch(base + url);
         this.products = this.products.concat(response.data);
         this.meta = response.meta;
         // console.log("response", response);
         return response;
      },
      async getProducts(url) {
         let base = "catalog";
         // if (object.type !== "Вторичная") {
         //    // project || apartaments
         //    if (object.category == 0) {
         //       base = "projects";
         //    } else {
         //       base = "apartaments";
         //    }
         // } else {
         //    base = "apartments";
         // }
         // console.log("search url", base + url);
         const response = await useBaseFetch(base + url);
         // console.log("Продукты по поиску", response.data);
         this.products = response.data;
         this.meta = response.meta;
         // console.log("response", response);
         return response;
      },
      getUrl(object) {
         let resultString = "";
         // console.log("filters object", object);
         if (object.type !== "Вторичная") {
            // project || apartaments
            if (object.category == 0) {
               resultString += "?filters[category]=projects";
            } else {
               resultString += "?filters[category]=apartaments";
            }
         } else {
            resultString = "?filters[category]=apartaments";
         }
         resultString += `&filters${this.makeSubStr(
            resultString
         )}[type_aparts]=${object.type}`;
         if (object.type !== "Коммерция") {
            // rooms
            if (object?.rooms?.length) {
               object.rooms.forEach((room) => {
                  resultString += `&filters${this.makeSubStr(
                     resultString
                  )}[count_rooms]=${room}`;
               });
            }
         }
         if (object?.price?.min) {
            resultString += `&filters${this.makeSubStr(
               resultString
            )}[cost_total][$gte]=${object?.price?.min}`;
         }
         if (object?.price?.max) {
            resultString += `&filters${this.makeSubStr(
               resultString
            )}[cost_total][$lte]=${object?.price?.max}`;
         }
         if (object?.area?.min) {
            resultString += `&filters${this.makeSubStr(
               resultString
            )}[square_apartament][$gte]=${object?.area?.min}`;
         }
         if (object?.area?.max) {
            resultString += `&filters${this.makeSubStr(
               resultString
            )}[square_apartament][$lte]=${object?.area?.max}`;
         }
         if (object.repair?.length && object.repair[0].value) {
            object.repair.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[finishing]=${item.name}`;
            });
         }
         if (object.date?.length && object.date[0].value) {
            object.date.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[proekty][date_complete]=${item?.name}`;
            });
         }
         if (object.floor?.length && object.floor[0].value) {
            object.floor.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[floor]=${item.name}`;
            });
         }

         if (object.placement?.length && object.placement[0].value) {
            object.placement.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[location]=${item?.name}`;
            });
         }
         if (object.transport?.length && object.transport[0].value) {
            object.transport.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[ring_road]=${item.name}`;
            });
         }

         if (object.target?.length && object.target[0].value) {
            object.target.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[appointment]=${item.name}`;
            });
         }
         if (object.entry?.length && object.entry[0].value) {
            object.entry.forEach((item) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[entrance]=${item.name}`;
            });
         }

         // rooms
         if (object?.tags?.length) {
            object.tags.forEach((tag) => {
               resultString += `&filters${this.makeSubStr(
                  resultString
               )}[ap_tags][tag][$eq]=${tag}`;
            });
         }
         // console.log("result string", resultString);
         return resultString;
      },
      getRanges(arr) {
         let prices = arr.map((item) => +item.cost_total);
         let areas = arr.map((item) => +item.square_apartament);
         let priceMin = 0;
         let priceMax = 0;
         if (prices.length > 0) {
            priceMin = Math.min(...prices);
            priceMax = Math.max(...prices);
         }
         let areaMin = 0;
         let areaMax = 0;
         if (areas.length > 0) {
            areaMin = Math.min(...areas);
            areaMax = Math.max(...areas);
         }
         return {
            area: {
               min: areaMin,
               max: areaMax,
            },
            price: {
               min: priceMin,
               max: priceMax,
            },
         };
      },
      getFinishing(arr) {
         let res = [...new Set(arr.map((item) => item.finishing))].map(
            (item, index) => {
               return {
                  name: item,
                  value: index + 1,
               };
            }
         );
         res.unshift({
            name: "Любая",
            value: 0,
         });
         return res;
      },
      getFloors(arr) {
         let res = [...new Set(arr.map((item) => item.floor))]
            .map((item, index) => {
               return {
                  name: item,
                  value: index + 1,
               };
            })
            .sort((a, b) => a.name - b.name);
         res.unshift({
            name: "Не важно",
            value: 0,
         });
         return res;
      },
      getSroks(arr) {
         let res = [
            ...new Set(arr.map((item) => item.proekty.date_complete)),
         ].map((item, index) => {
            return {
               name: item,
               value: index + 1,
            };
         });
         res.unshift({
            name: "Не важно",
            value: 0,
            // selected: true,
         });
         return res;
      },
      getLocation(arr) {
         let res = [...new Set(arr.map((item) => item.location))]
            .filter((item) => item !== null)
            .map((item, index) => {
               return {
                  name: item,
                  value: index + 1,
               };
            });
         res.unshift({
            name: "Не важно",
            value: 0,
         });
         return res;
      },
      getTransport(arr) {
         let res = [...new Set(arr.map((item) => item.ring_road))]
            .filter((item) => item !== null)
            .map((item, index) => {
               return {
                  name: item,
                  value: index + 1,
               };
            });
         res.unshift({
            name: "Не важно",
            value: 0,
         });
         return res;
      },
      getTarget(arr) {
         let res = [...new Set(arr.map((item) => item.appointment))]
            .filter((item) => item !== null)
            .map((item, index) => {
               return {
                  name: item,
                  value: index + 1,
               };
            });
         res.unshift({
            name: "Не важно",
            value: 0,
         });
         return res;
      },
      getEntry(arr) {
         let res = [...new Set(arr.map((item) => item.entrance))]
            .filter((item) => item !== null)
            .map((item, index) => {
               return {
                  name: item,
                  value: index + 1,
               };
            });
         res.unshift({
            name: "Не важно",
            value: 0,
         });
         return res;
      },
      getTags(arr) {
         let res = [
            ...new Set(
               arr
                  .map((item) => item.ap_tags)
                  .filter((item) => item !== null && item.length !== 0)
                  .flat()
                  .map((item) => item.tag)
            ),
         ].map((item, index) => {
            return {
               name: item,
               value: index + 1,
            };
         });
         // console.log("tags", res);
         return res;
      },

      async getFiltersForCats(cat, t, slug) {
         let types = {
            build: "Новостройки",
            commerce: "Коммерция",
            secondary: "Вторичная",
         };
         let type = types[t];
         let base = "catalog";
         let obj = {
            ranges: null,
            repair: null,
            sroks: null,
         };
         let url = `?filters[category]=${
            cat == 0 ? "projects" : "apartaments"
         }`;
         url += `&filters${this.makeSubStr(url)}[type_aparts]=${type}`;
         url += `&pagination[pageSize]=10000`;
         if (slug) {
            url += `&filters[proekty][slug]=${slug}`;
         }
         const response = await useBaseFetch(base + url);
         let productsArr = [];
         if (cat == 0) {
            productsArr = response.data.flatMap((item) => item.apartaments);
         } else {
            productsArr = response.data;
         }
         obj.ranges = this.getRanges(productsArr);
         obj.repair = this.getFinishing(productsArr);
         obj.sroks = this.getSroks(productsArr);
         obj.floors = this.getFloors(productsArr);
         obj.location = this.getLocation(productsArr);
         obj.transport = this.getTransport(productsArr);
         obj.target = this.getTarget(productsArr);
         obj.entry = this.getEntry(productsArr);
         obj.tags = this.getTags(productsArr);
         // console.log("get filters for cat", obj);
         return obj;
      },
   },
});
