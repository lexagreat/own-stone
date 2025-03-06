export const useBanks = defineStore("useBanks", {
   state: () => ({
      programms: [],
   }),
   actions: {
      getProgramms(arr) {
         let resArr = [
            ...new Set(
               arr
                  .flatMap((item) => item.bank_programs)
                  .map((item) => item.program_title)
            ),
         ].map((item, index) => {
            return { value: index + 1, name: item };
         });
         resArr.unshift({
            value: 0,
            name: "Не важно",
            selected: true,
         });
         return resArr;
      },
      getTitles(arr) {
         let resArr = [...new Set(arr.map((item) => item.bank_title))].map(
            (item, index) => {
               return { value: index + 1, name: item };
            }
         );
         resArr.unshift({
            value: 0,
            name: "Не важно",
            selected: true,
         });
         return resArr;
      },
      getAmount(arr) {
         let newArr = [
            ...new Set(
               arr
                  .flatMap((item) => item.bank_programs)
                  .map((item) => +item.maxamount)
            ),
         ];
         return {
            min: Math.min(...newArr),
            max: Math.max(...newArr),
         };
      },
      getCash(arr) {
         let newArr = [
            ...new Set(
               arr
                  .flatMap((item) => item.bank_programs)
                  .map((item) => +item.mincash)
            ),
         ];
         return {
            min: Math.min(...newArr),
            max: Math.max(...newArr),
         };
      },
      getPeriod(arr) {
         let newArr = [
            ...new Set(
               arr
                  .flatMap((item) => item.bank_programs)
                  .map((item) => +item.maxperiod)
            ),
         ];
         return {
            min: Math.min(...newArr),
            max: Math.max(...newArr),
         };
      },
      getUrl(object) {
         let resUrl = "?";
         if (object.banks?.length && object.banks[0]?.value) {
            object.banks.forEach((item) => {
               resUrl += `&filters[bank_title]=${item.name}`;
            });
         }
         if (object.programms?.length && object.programms[0]?.value) {
            object.programms.forEach((item) => {
               resUrl += `&filters[bank_programs][program_title]=${item.name}`;
            });
         }
         if (object?.price?.min) {
            resultString += `&filters[bank_programs][maxamount][$gte]=${object?.price?.min}`;
         }
         if (object?.price?.max) {
            resultString += `&filters[bank_programs][maxamount][$lte]=${object?.price?.max}`;
         }
         if (object?.initial?.min) {
            resultString += `&filters[bank_programs][mincash][$gte]=${object?.initial?.min}`;
         }
         if (object?.initial?.max) {
            resultString += `&filters[bank_programs][mincash][$lte]=${object?.initial?.max}`;
         }
         if (object?.date?.min) {
            resultString += `&filters[bank_programs][maxperiod][$gte]=${object?.date?.min}`;
         }
         if (object?.date?.max) {
            resultString += `&filters[bank_programs][maxperiod][$lte]=${object?.date?.max}`;
         }
         return resUrl;
      },
      async getList(url) {
         let { meta, data } = await useBaseFetch("/bank-programs" + url);
         this.programms = data;
         return data;
      },
      async getFilters() {
         let { data } = await useBaseFetch(
            "/bank-programs?pagination[pageSize]=10000"
         );
         return {
            programms: this.getProgramms(data),
            titles: this.getTitles(data),
            amount: this.getAmount(data),
            cash: this.getCash(data),
            period: this.getPeriod(data),
         };
      },
   },
});
