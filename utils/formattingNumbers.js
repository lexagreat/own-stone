export function formatPrice(number) {
   return formatNumber(number) + " ₽";
}
export function formatNumber(number) {
   if (!number && number !== 0) return "";
   return number
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
