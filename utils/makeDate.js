export default function (date) {
   const { $dayjs } = useNuxtApp();
   return $dayjs(String(date), "YYYY-MM-DD").format("DD MMMM YYYY");
}
