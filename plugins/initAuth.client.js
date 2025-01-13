import { useAccount } from "~/store/account";

export default () => {
   const store = useAccount();
   if (process.client) {
      store.init();
   }
};
